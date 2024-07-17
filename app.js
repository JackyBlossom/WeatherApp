document.addEventListener('DOMContentLoaded', () => {
  const temperatureElement = document.getElementById('temperature');
  const highElement = document.getElementById('high');
  const lowElement = document.getElementById('low');
  const conditionElement = document.getElementById('condition');

  const API_URL = 'https://api.open-meteo.com/v1/forecast?latitude=35.682839&longitude=139.759455&daily=temperature_2m_max,temperature_2m_min&current_weather=true&timezone=Asia/Tokyo';

  fetch(API_URL)
      .then(response => response.json())
      .then(data => {
          const temperature = data.current_weather.temperature;
          const high = data.daily.temperature_2m_max[0];
          const low = data.daily.temperature_2m_min[0];
          const condition = data.current_weather.weathercode;

          temperatureElement.textContent = `現在の気温: ${temperature}°C`;
          highElement.textContent = `最高気温: ${high}°C`;
          lowElement.textContent = `最低気温: ${low}°C`;
          conditionElement.textContent = `天気: ${getWeatherDescription(condition)}`;
      })
      .catch(error => {
          console.error('Error fetching weather data:', error);
          temperatureElement.textContent = '気温を取得できません';
          highElement.textContent = '最高気温を取得できません';
          lowElement.textContent = '最低気温を取得できません';
          conditionElement.textContent = '天気を取得できません';
      });

  function getWeatherDescription(code) {
      const weatherCodes = {
          0: '快晴',
          1: '晴れ',
          2: '曇り',
          3: '霧',
          45: '霧雨',
          48: '霧雨',
          51: '小雨',
          53: '小雨',
          55: '小雨',
          56: '霧雨',
          57: '霧雨',
          61: '小雨',
          63: '雨',
          65: '大雨',
          66: '霧雨',
          67: '霧雨',
          71: '小雪',
          73: '雪',
          75: '大雪',
          77: '雪',
          80: '雷雨',
          81: '雷雨',
          82: '雷雨',
          85: '雷雨',
          86: '雷雨'
      };
      return weatherCodes[code] || '不明';
  }
});
