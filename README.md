# Ecommerce Frontend

A modern, responsive e-commerce frontend application built with React. This project provides a complete user interface for browsing products, managing shopping carts, and processing payments.

## 🎯 Features

- **Product Browsing**: Browse and filter products with an intuitive interface
- **Shopping Cart**: Add/remove items and manage quantities
- **Payment Integration**: Secure payment processing with Stripe
- **Responsive Design**: Mobile-friendly UI with Bootstrap and Tailwind CSS
- **Pagination**: Efficient product list navigation with React Paginate
- **Data Visualization**: Interactive charts with Recharts
- **Icon Library**: Rich set of UI icons from React Icons and Hero Icons
- **Routing**: Client-side navigation with React Router v7
- **State Management**: Modern state management with Immer

## 🚀 Tech Stack

### Core Framework
- **React** 19.1.1 - UI library
- **React Router** 7.8.0 - Client-side routing
- **React DOM** 19.1.1 - DOM rendering

### Styling
- **Tailwind CSS** 3.4.17 - Utility-first CSS framework
- **Bootstrap** 5.3.7 - CSS framework components
- **PostCSS** 8.5.6 - CSS transformations

### UI Components & Icons
- **React Bootstrap** 2.10.10 - Bootstrap components for React
- **React Icons** 5.5.0 - Popular icon libraries
- **Hero Icons** 2.2.0 - Beautiful hand-crafted SVG icons
- **Headless UI** 2.2.7 - Unstyled accessible components

### Data Visualization
- **Recharts** 3.1.2 - React charting library

### Payments
- **Stripe JS** 7.9.0 - Stripe payment integration

### HTTP Client
- **Axios** 1.11.0 - Promise-based HTTP client

### Development Tools
- **React Scripts** 5.0.1 - CRA build tools
- **TypeScript** 4.9.5 - Static type checking
- **ESLint** 8.57.1 - Code linting
- **Jest** 27.5.1 - Testing framework
- **Webpack** 5.101.2 - Module bundler

### Build Stats
- **JavaScript**: 78,195 bytes
- **HTML**: 1,725 bytes
- **CSS**: 1,368 bytes

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/beki-get/ecommerce-frontend.git
cd ecommerce-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn dev
```

The application will be available at `http://localhost:3000`

## 🛠️ Available Scripts

- **`npm start` or `npm run dev`** - Runs the app in development mode
- **`npm test`** - Runs the test suite with Jest
- **`npm run build`** - Builds the app for production

## 📁 Project Structure

```
ecommerce-frontend/
├── public/           # Static files
├── src/              # Source code
│   ├── components/   # Reusable React components
│   ├── pages/        # Page components
│   ├── styles/       # CSS/SCSS files
│   └── App.js        # Main application component
├── package.json      # Dependencies and scripts
└── README.md         # This file
```

## 🔧 Configuration

### Tailwind CSS
Tailwind CSS is configured with custom plugins and extensions:
- Forms plugin for enhanced form styling
- Aspect ratio plugin for responsive media

### Webpack
The project uses Create React App's webpack configuration which includes:
- Hot module reloading for development
- Optimized bundle splitting for production
- CSS and asset processing

## 💳 Stripe Integration

Payment processing is handled through Stripe. Configure your Stripe keys:
1. Add your Stripe publishable key to your environment variables
2. Stripe JS library is included and ready to use

## 🧪 Testing

Run tests using Jest:
```bash
npm test
```

Test environment is configured to use jsdom for DOM testing.

## 📱 Browser Support

The application supports the following browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Production build targets:
- >0.2% market share
- Not dead browsers
- Not Opera Mini

## 🚀 Deployment

Build the production bundle:
```bash
npm run build
```

This creates an optimized build in the `build/` directory that's ready for deployment.

## 📄 License

ISC

## 👤 Author

beki-get

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📞 Support

For issues or questions, please create an issue in the repository.

---

**Built with ❤️ using React**
