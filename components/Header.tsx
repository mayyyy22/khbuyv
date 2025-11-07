
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
        <span role="img" aria-label="island" className="mr-2">🏝️</span>
        제주 날씨 데이터 분석
      </h1>
      <p className="mt-2 text-md text-slate-600">
        Gemini AI를 이용한 가상 데이터 시각화
      </p>
    </header>
  );
};

export default Header;
