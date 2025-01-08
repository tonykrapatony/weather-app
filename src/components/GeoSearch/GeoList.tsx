import { FC, useEffect, useRef } from 'react'
import { Option } from '../../types';

type GeoListProps = {
  options: Option[];
  city: string;
  value: Option;
  setCity: (value: string) => void;
  setValue: (option: Option) => void;
  setOptions: (option: Option[] | null) => void;
}

const GeoList: FC<GeoListProps> = ({ options, setOptions, setCity, setValue, city, value }) => {
  const dropdownRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      console.log('dropdownRef.current: ', dropdownRef.current)
      console.log('event.target: ', event.target)
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOptions(null);
        setCity(value.label);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [city, value.label, setCity, setOptions]);

  const selectCity = (value: Option) => {
    setValue(value);
    setCity(value.label);
    setOptions(null);
  }

  return (
    <ul
      ref={dropdownRef}
      className='absolute top-full-4 right-0 w-full sm:w-72 h-32 overflow-y-auto bg-white border border-black rounded-md'
    >
      {options.map((option) => (
        <li 
          key={option.label} 
          className='p-2 cursor-pointer border-b border-b-gray-500 hover:bg-gray-200'
          onClick={() => selectCity(option)}
        >
          {option.label}
        </li>
      ))}
    </ul>
  )
}

export default GeoList