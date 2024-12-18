import { socket } from '../api';
import ErrorService from './errorService';

class AuthService {
  constructor() {
    this.user = null;
    this.listeners = new Set();
  }

  async login(email, password) {
    try {
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const userData = await response.json();
      this.setUser(userData);
      return userData;
    } catch (error) {
      ErrorService.handleError(error, { 
        context: 'User Login', 
        email: email.replace(/(.{2}).*(?=@)/, '***') 
      });
      throw error;
    }
  }

  // OAuth Authentication
  async googleLogin() {
    try {
      // Implement Google OAuth flow
      const response = await fetch('/api/auth/google');
      const userData = await response.json();
      this.setUser(userData);
      return userData;
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  }

  // Guest Access
  createGuestUser(username) {
    const guestUser = {
      id: `guest-${Date.now()}`,
      username,
      type: 'guest'
    };
    this.setUser(guestUser);
    return guestUser;
  }

  setUser(userData) {
    try {
      if (!userData || !userData.id) {
        throw new Error('Invalid user data');
      }
      
      this.user = userData;
      socket.emit('user-join', userData);
      this.notifyListeners();
    } catch (error) {
      ErrorService.handleError(error, { context: 'Set User' });
    }
  }

  logout() {
    socket.emit('user-leave', this.user);
    this.user = null;
    this.notifyListeners();
  }

  // Observer pattern for authentication state changes
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener(this.user));
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.user;
  }
}

export default new AuthService();