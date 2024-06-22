import { useState } from 'react';
import { Button } from '../ui/button';
import { X } from 'lucide-react';

const OrderButton = ({ order }:{order:Record<string, string>}) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
        <Button onClick={togglePopup}>الطلب</Button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            
          <button
              onClick={togglePopup}
              className="h-8 w-8"
            >
              <X className='w-6 h-6'/>
            </button>
            <h2 className="text-xl font-bold mb-4">معلومات الطلب</h2>
            <ul className="mb-4 overflow-y-auto max-h-96 p-4 text-left" dir='ltr'>
              {Object.keys(order).map((key) => (
                <li key={key} className="mb-2">
                  <strong>{key}</strong>: {order[key]}
                </li>
              ))}
            </ul>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderButton;
