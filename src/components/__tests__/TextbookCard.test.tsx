import { render, screen } from '@testing-library/react';
import TextbookCard from '../TextbookCard/TextbookCard';

const mockTextbook = {
  id: 1,
  title: 'Test Book',
  author: 'Test Author',
  price: '100',
  condition: 'New',
  school_class: '5',
  publisher: 'Test Publisher',
  subject: 'Math',
  seller: 'testuser',
  description: 'Test description',
  image: {
    preview: '/test.jpg',
    detail: '/test.jpg',
    full_size: '/test.jpg',
  },
  whatsapp_contact: '',
  viber_contact: '',
  telegram_contact: '',
  phone_contact: '',
  created_at: '2024-01-01',
  updated_at: '2024-01-01',
};

describe('TextbookCard', () => {
  it('renders textbook information', () => {
    render(<TextbookCard textbook={mockTextbook} index={0} />);
    
    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText(/Test Author/)).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });
});

