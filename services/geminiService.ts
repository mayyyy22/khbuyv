import { GoogleGenAI, Type } from "@google/genai";
import { type WeatherDataPoint } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const fetchWeatherData = async (
  region: string,
  metric: string,
  startDate: string,
  endDate: string
): Promise<WeatherDataPoint[]> => {
  const prompt = `
    너는 제주도의 기상 데이터를 제공하는 매우 정확한 API다.
    다음 조건에 맞는 가상의 기상 데이터를 JSON 형식으로 생성해줘.

    - 지역: ${region}
    - 기상 항목: ${metric}
    - 시작일: ${startDate}
    - 종료일: ${endDate}

    데이터는 시작일부터 종료일까지 매일의 데이터를 포함해야 하며, 날짜 순서대로 정렬되어야 한다.
    각 데이터 포인트는 'date' (YYYY-MM-DD 형식)와 'value' (숫자) 키를 가져야 한다.

    - '${metric}'가 '평균 기온'인 경우, value는 계절을 고려하여 -5에서 35 사이의 현실적인 값이 되어야 한다.
    - '${metric}'가 '습도'인 경우, value는 40에서 100 사이의 값이 되어야 한다.
    - '${metric}'가 '강수량'인 경우, value는 0에서 50 사이의 값이 되어야 하며, 비가 오지 않는 날도 많아야 한다.
    - '${metric}'가 '풍속'인 경우, value는 0에서 15 사이의 값이 되어야 한다.

    결과는 JSON 배열이어야 하며, 다른 설명, 마크다운 포맷팅 없이 순수한 JSON 텍스트만 반환해야 한다.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              date: {
                type: Type.STRING,
                description: 'The date in YYYY-MM-DD format.'
              },
              value: {
                type: Type.NUMBER,
                description: 'The weather data value for the given metric.'
              }
            },
            required: ['date', 'value'],
          }
        }
      }
    });

    const responseText = response.text.trim();
    
    // The model can sometimes wrap the JSON in markdown or add extra text.
    // This logic finds the JSON array by locating the first '[' and last ']'.
    const startIndex = responseText.indexOf('[');
    const endIndex = responseText.lastIndexOf(']');

    if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
      console.error("Could not find a valid JSON array in the API response:", responseText);
      throw new Error("Invalid format in API response. No JSON array found.");
    }
    
    const jsonString = responseText.substring(startIndex, endIndex + 1);
    
    const data = JSON.parse(jsonString);
    
    if (!Array.isArray(data)) {
        throw new Error("Parsed data is not an array.");
    }

    return data as WeatherDataPoint[];
  } catch (error) {
    console.error("Error fetching or parsing weather data from Gemini API:", error);
    if (error instanceof SyntaxError) {
        throw new Error("Failed to parse JSON from API response.");
    }
    throw new Error("Failed to get valid weather data from API.");
  }
};
