import { useState, useEffect } from 'react';

export function useExperienceCalculator(startDate, endDate = new Date()) {
  const [duration, setDuration] = useState('');

  useEffect(() => {
    const calculateDuration = () => {
      const start = new Date(startDate);
      const end = endDate > new Date() ? new Date() : endDate;
      
      let yearDiff = end.getFullYear() - start.getFullYear();
      let monthDiff = end.getMonth() - start.getMonth();
      
      if (end.getDate() < start.getDate()) monthDiff--;
      if (monthDiff < 0) { yearDiff--; monthDiff += 12; }
      
      let result = '';
      if (yearDiff > 0) result += `${yearDiff} Year${yearDiff > 1 ? 's' : ''}`;
      if (monthDiff > 0) {
        if (result) result += ', ';
        result += `${monthDiff} Month${monthDiff > 1 ? 's' : ''}`;
      }
      if (!result) {
        const dayDiff = Math.floor((end - start) / (1000 * 60 * 60 * 24));
        result = dayDiff > 0 ? `${dayDiff} Day${dayDiff > 1 ? 's' : ''}` : 'Just started';
      }
      
      setDuration(result);
    };

    calculateDuration();
    const interval = setInterval(calculateDuration, 1000 * 60 * 60 * 24);
    return () => clearInterval(interval);
  }, [startDate, endDate]);

  return duration;
}

export function useTotalExperience(workPeriods) {
  const [experience, setExperience] = useState({ main: '', detail: '' });

  useEffect(() => {
    const calculate = () => {
      const now = new Date();
      let totalMonths = 0;

      workPeriods.forEach(period => {
        const start = new Date(period.start);
        let end;
        
        if (period.end === null) {
          end = now;
        } else {
          end = new Date(period.end);
        }
        
        let months = (end.getFullYear() - start.getFullYear()) * 12;
        months += end.getMonth() - start.getMonth();
        
        if (end.getDate() < start.getDate()) months--;
        
        if (end.getTime() >= start.getTime()) {
          totalMonths += months;
        }
      });

      const years = Math.floor(totalMonths / 12);
      const months = totalMonths % 12;

      let mainText = '';
      let detailText = '';

      if (years > 0) {
        mainText = `${years} year +`;
        detailText = months > 0 ? `(${months} months)` : '';
      } else if (months > 0) {
        mainText = `${months} months`;
        detailText = '';
      } else {
        mainText = '0 months';
        detailText = '';
      }

      setExperience({ main: mainText, detail: detailText });
    };

    calculate();
  }, [workPeriods]);

  return experience;
}
