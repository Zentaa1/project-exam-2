declare module 'react-flatpickr' {
    import { ComponentType } from 'react';
    import { DateOptions } from 'flatpickr/dist/types/options';
  
    export interface FlatpickrProps {
      value?: Date | Date[];
      options?: DateOptions;
      onChange?: (selectedDates: Date[]) => void;
      className?: string;
    }
  
    const Flatpickr: ComponentType<FlatpickrProps>;
    export default Flatpickr;
  }
  