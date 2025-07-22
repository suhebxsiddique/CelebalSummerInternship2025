import React, { createContext, useContext, useReducer, useEffect } from 'react';

const BookingContext = createContext();

const initialState = {
  events: [],
  bookings: [],
  loading: false,
  error: null
};

const bookingReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_EVENTS_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_EVENTS_SUCCESS':
      return { ...state, events: action.payload, loading: false };
    case 'FETCH_EVENTS_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'CREATE_EVENT_SUCCESS':
      return { ...state, events: [...state.events, action.payload] };
    case 'UPDATE_EVENT_SUCCESS':
      return {
        ...state,
        events: state.events.map(event => 
          event.id === action.payload.id ? action.payload : event
        )
      };
    case 'DELETE_EVENT_SUCCESS':
      return {
        ...state,
        events: state.events.filter(event => event.id !== action.payload)
      };
    case 'CREATE_BOOKING_SUCCESS':
      return { ...state, bookings: [...state.bookings, action.payload] };
    case 'FETCH_BOOKINGS_SUCCESS':
      return { ...state, bookings: action.payload };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  // Initialize with Indian market mock data
  useEffect(() => {
    const mockEvents = [
      {
        id: 1,
        title: 'Celebal Technologies - Tech Innovation Summit 2025',
        description: 'Join Celebal Technologies for their annual tech innovation summit. Discover cutting-edge AI, cloud solutions, and digital transformation strategies. Network with industry leaders and explore career opportunities.',
        date: '2024-12-20',
        time: '09:00',
        venue: 'Celebal Technologies HQ, Mumbai',
        price: 1500,
        capacity: 500,
        availableSeats: 320,
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
        category: 'Workshops',
        rating: 4.9,
        reviews: 89,
        trending: true,
        city: 'Mumbai'
      },
      {
        id: 2,
        title: 'Celebal Technologies - AI & Machine Learning Workshop',
        description: 'Hands-on workshop on AI and Machine Learning technologies. Learn from Celebal\'s expert data scientists and get practical experience with real-world projects.',
        date: '2024-12-22',
        time: '14:00',
        venue: 'Celebal Technologies Training Center, Delhi',
        price: 2000,
        capacity: 100,
        availableSeats: 45,
        image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400',
        category: 'Workshops',
        rating: 4.8,
        reviews: 67,
        trending: true,
        city: 'Delhi'
      },
      {
        id: 3,
        title: 'Celebal Technologies - Career Fair & Recruitment Drive',
        description: 'Celebal Technologies is hiring! Meet HR professionals, technical leads, and hiring managers. Open positions for developers, data scientists, and business analysts.',
        date: '2024-12-24',
        time: '10:00',
        venue: 'Celebal Technologies Office, Bangalore',
        price: 0,
        capacity: 200,
        availableSeats: 156,
        image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400',
        category: 'Workshops',
        rating: 4.7,
        reviews: 123,
        trending: true,
        city: 'Bangalore'
      },
      {
        id: 4,
        title: 'Bollywood Night - Live Concert',
        description: 'Experience the magic of Bollywood with live performances by top singers. Featuring hits from the latest movies and classic songs that will make you dance all night long.',
        date: '2024-12-25',
        time: '19:00',
        venue: 'Jio World Garden, BKC, Mumbai',
        price: 2500,
        capacity: 2000,
        availableSeats: 1850,
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
        category: 'Music',
        rating: 4.8,
        reviews: 156,
        trending: true,
        city: 'Mumbai'
      },
      {
        id: 5,
        title: 'IPL Cricket Match - Mumbai Indians vs Chennai Super Kings',
        description: 'Witness the biggest rivalry in IPL cricket! Mumbai Indians take on Chennai Super Kings in an electrifying match at the iconic Wankhede Stadium.',
        date: '2024-12-28',
        time: '19:30',
        venue: 'Wankhede Stadium, Mumbai',
        price: 3500,
        capacity: 33108,
        availableSeats: 28900,
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400',
        category: 'Sports',
        rating: 4.9,
        reviews: 234,
        trending: true,
        city: 'Mumbai'
      },
      {
        id: 6,
        title: 'Stand-up Comedy Night with Zakir Khan',
        description: 'Laugh your heart out with India\'s favorite comedian Zakir Khan. An evening filled with hilarious stories and witty observations about life.',
        date: '2024-12-30',
        time: '20:00',
        venue: 'NCPA, Nariman Point, Mumbai',
        price: 1200,
        capacity: 500,
        availableSeats: 150,
        image: 'https://images.unsplash.com/photo-1603190287605-e6ade32fa852?w=400',
        category: 'Comedy',
        rating: 4.7,
        reviews: 89,
        trending: false,
        city: 'Mumbai'
      },
      {
        id: 7,
        title: 'Classical Music Festival',
        description: 'Experience the soul-stirring melodies of Indian classical music. Featuring renowned artists performing Hindustani and Carnatic music.',
        date: '2025-01-05',
        time: '18:00',
        venue: 'NCPA Tata Theatre, Mumbai',
        price: 800,
        capacity: 1000,
        availableSeats: 780,
        image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400',
        category: 'Music',
        rating: 4.6,
        reviews: 67,
        trending: false,
        city: 'Mumbai'
      },
      {
        id: 8,
        title: 'Bollywood Movie Premiere - "Dreams of Tomorrow"',
        description: 'Be the first to watch the most anticipated Bollywood movie of the year! Red carpet event with celebrity appearances.',
        date: '2025-01-10',
        time: '21:00',
        venue: 'PVR Cinemas, Phoenix Mall, Mumbai',
        price: 1500,
        capacity: 300,
        availableSeats: 45,
        image: 'https://images.unsplash.com/photo-1489599832527-2f692cbb4361?w=400',
        category: 'Movies',
        rating: 4.5,
        reviews: 23,
        trending: true,
        city: 'Mumbai'
      },
      {
        id: 9,
        title: 'Tech Startup Summit 2025',
        description: 'Join India\'s biggest tech startup event. Network with entrepreneurs, investors, and industry leaders. Learn about the latest trends in technology.',
        date: '2025-01-15',
        time: '09:00',
        venue: 'Bombay Exhibition Centre, Goregaon, Mumbai',
        price: 3000,
        capacity: 1000,
        availableSeats: 320,
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
        category: 'Workshops',
        rating: 4.4,
        reviews: 45,
        trending: false,
        city: 'Mumbai'
      },
      {
        id: 10,
        title: 'Theater Play - "The Last Train"',
        description: 'A gripping theatrical performance that explores human relationships and emotions. Directed by acclaimed director Naseeruddin Shah.',
        date: '2025-01-20',
        time: '19:30',
        venue: 'Prithvi Theatre, Juhu, Mumbai',
        price: 600,
        capacity: 200,
        availableSeats: 89,
        image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=400',
        category: 'Theater',
        rating: 4.8,
        reviews: 78,
        trending: false,
        city: 'Mumbai'
      },
      {
        id: 11,
        title: 'Yoga & Wellness Workshop',
        description: 'Transform your life with ancient Indian wisdom. Learn yoga, meditation, and wellness techniques from certified instructors.',
        date: '2025-01-25',
        time: '07:00',
        venue: 'Yoga Institute, Santacruz, Mumbai',
        price: 500,
        capacity: 100,
        availableSeats: 65,
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
        category: 'Workshops',
        rating: 4.9,
        reviews: 112,
        trending: false,
        city: 'Mumbai'
      },
      {
        id: 12,
        title: 'Delhi Food Festival',
        description: 'Experience the diverse flavors of Delhi\'s street food and fine dining. From Chandni Chowk to Connaught Place, taste the best of Delhi.',
        date: '2025-01-12',
        time: '12:00',
        venue: 'DLF Cyber Hub, Gurgaon',
        price: 800,
        capacity: 500,
        availableSeats: 234,
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
        category: 'Workshops',
        rating: 4.7,
        reviews: 156,
        trending: true,
        city: 'Delhi'
      },
      {
        id: 13,
        title: 'Bangalore Tech Meetup',
        description: 'Connect with Bangalore\'s tech community. Share ideas, learn new technologies, and build meaningful connections.',
        date: '2025-01-18',
        time: '18:00',
        venue: 'WeWork, Koramangala, Bangalore',
        price: 400,
        capacity: 150,
        availableSeats: 89,
        image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400',
        category: 'Workshops',
        rating: 4.6,
        reviews: 67,
        trending: false,
        city: 'Bangalore'
      }
    ];

    dispatch({ type: 'FETCH_EVENTS_SUCCESS', payload: mockEvents });
  }, []);

  const createEvent = async (eventData) => {
    try {
      const newEvent = {
        id: Date.now(),
        ...eventData,
        availableSeats: eventData.capacity,
        rating: 4.5,
        reviews: 0,
        trending: false
      };
      
      dispatch({ type: 'CREATE_EVENT_SUCCESS', payload: newEvent });
      return { success: true, event: newEvent };
    } catch (error) {
      dispatch({ type: 'FETCH_EVENTS_FAILURE', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const updateEvent = async (eventId, eventData) => {
    try {
      const updatedEvent = { id: eventId, ...eventData };
      dispatch({ type: 'UPDATE_EVENT_SUCCESS', payload: updatedEvent });
      return { success: true, event: updatedEvent };
    } catch (error) {
      dispatch({ type: 'FETCH_EVENTS_FAILURE', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      dispatch({ type: 'DELETE_EVENT_SUCCESS', payload: eventId });
      return { success: true };
    } catch (error) {
      dispatch({ type: 'FETCH_EVENTS_FAILURE', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const createBooking = async (bookingData) => {
    try {
      const newBooking = {
        id: Date.now(),
        ...bookingData,
        status: 'confirmed',
        bookingDate: new Date().toISOString(),
        bookingNumber: `BK${Date.now()}`,
        currency: 'INR'
      };

      // Update available seats
      const event = state.events.find(e => e.id === bookingData.eventId);
      if (event && event.availableSeats >= bookingData.quantity) {
        const updatedEvent = {
          ...event,
          availableSeats: event.availableSeats - bookingData.quantity
        };
        dispatch({ type: 'UPDATE_EVENT_SUCCESS', payload: updatedEvent });
      }

      dispatch({ type: 'CREATE_BOOKING_SUCCESS', payload: newBooking });
      return { success: true, booking: newBooking };
    } catch (error) {
      dispatch({ type: 'FETCH_EVENTS_FAILURE', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const getEventById = (eventId) => {
    return state.events.find(event => event.id === parseInt(eventId));
  };

  const getUserBookings = (userId) => {
    return state.bookings.filter(booking => booking.userId === userId);
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    ...state,
    createEvent,
    updateEvent,
    deleteEvent,
    createBooking,
    getEventById,
    getUserBookings,
    clearError
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}; 