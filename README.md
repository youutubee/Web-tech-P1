# VoyageFlow — Interactive Travel Experience Simulator

A modern, fully responsive travel booking simulation website built following Woox Travel design specifications.

## 🎨 Design Inspiration

This project follows the **Woox Travel** design specification with:
- **Primary Color**: #00bcd4 (Cyan/Teal)
- **Secondary Color**: #007b8a
- **Typography**: Open Sans (Google Fonts)
- **Framework**: Bootstrap 5.2.0
- Clean, professional, and modern layout

## 📁 Project Structure

```
Web tech Project/
├── index.html              # Main HTML file
├── css/
│   ├── main.css           # Main stylesheet (Woox design)
│   └── components.css     # Component-specific styles
├── js/
│   ├── utils.js           # Utility functions
│   ├── navigation.js      # Navigation system
│   ├── carousel.js        # Carousel slider
│   └── pages/
│       ├── registration.js      # Registration page logic
│       ├── blog.js              # Blog page logic
│       ├── destination-selection.js  # Destination selection
│       ├── calculator.js        # Price calculator
│       ├── review.js            # Review page
│       └── thankyou.js          # Thank you page
├── data/
│   └── destinations.js    # Destination-specific packages data
└── README.md              # This file
```

## ✨ Features

### Page 1: Registration
- Hero carousel slider with multiple slides
- Registration form with real-time validation
- Popular destinations preview
- Custom success modal

### Page 2: Travel Blog
- Sticky navigation bar
- 6 destination sections with smooth scrolling
- Full-screen blog sections with background images
- Intersection Observer for active section highlighting

### Page 2b: Destination Selection
- Interactive destination cards
- Click to select destination
- Visual feedback on selection
- Dynamic card population from data

### Page 3: Trip Calculator
- **Destination-specific packages** - Each destination has unique:
  - Accommodation options
  - Travel options
  - Food packages
  - Activities
- Real-time price calculation
- Price breakdown by category
- Sticky total price footer

### Page 4: Review
- Star rating system
- Review text input
- Form validation
- Success feedback

### Page 5: Thank You
- Booking summary
- User data display
- Social media links
- Start over functionality

## 🎯 Key Features

1. **Destination-Specific Packages**: Each destination (Paris, Tokyo, Rome, Bali, Santorini, Dubai) has completely unique packages for:
   - Accommodation (3 options per destination)
   - Travel (4 options per destination)
   - Food (5 options per destination)
   - Activities (5 options per destination)

2. **Woox Travel Design**:
   - Bootstrap 5.2.0 framework
   - Cyan/Teal color scheme (#00bcd4)
   - Open Sans typography
   - Professional button styles
   - Card hover effects
   - Sticky navigation

3. **Modular Architecture**:
   - Separate CSS files
   - Modular JavaScript files
   - Data-driven content
   - Reusable utility functions

4. **Responsive Design**:
   - Mobile-friendly navigation
   - Hamburger menu for small screens
   - Touch-friendly buttons
   - Responsive grid layouts

## 🚀 Getting Started

1. **Open the project**:
   ```bash
   # Simply open index.html in a browser
   # Or use a local server:
   python3 -m http.server 8000
   ```

2. **Access the website**:
   - Open `http://localhost:8000` in your browser

## 📝 Usage Flow

1. **Register**: Fill out the registration form with validation
2. **Browse**: Explore destinations in the blog section
3. **Select**: Choose your preferred destination
4. **Plan**: Select packages (accommodation, travel, food, activities)
5. **Review**: Rate your experience and leave feedback
6. **Confirm**: View your booking summary

## 🎨 Design Elements

### Colors
- Primary: `#00bcd4` (Cyan/Teal)
- Secondary: `#007b8a` (Darker Teal)
- Background: `#ffffff` (White)
- Text: `#333333` (Dark Gray)
- Accent: `#f5f5f5` (Light Gray)

### Typography
- Font Family: Open Sans
- Headings: Bold, 48px (H1) to 14px (H6)
- Body: Regular, 16px

### Buttons
- Primary: Cyan background, white text, uppercase
- Hover: Darker cyan (#007b8a)
- Padding: 12px 30px
- Border Radius: 4px

## 🔧 Technical Details

- **No Backend**: Fully client-side, uses sessionStorage
- **No Database**: All data is static/hardcoded
- **Bootstrap 5.2.0**: For responsive grid and components
- **Font Awesome 6.4.0**: For icons
- **Vanilla JavaScript**: ES6+ features
- **CSS3**: Modern CSS with animations

## 📦 Destination Data

Each destination in `data/destinations.js` contains:
- Name and description
- Base price
- Unique accommodation options
- Unique travel options
- Unique food packages
- Unique activities

All packages are destination-specific and different for each location.

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is created for educational purposes.

## 👨‍💻 Development

To modify the project:

1. **Add a new destination**: Edit `data/destinations.js`
2. **Change styles**: Edit `css/main.css` or `css/components.css`
3. **Modify functionality**: Edit corresponding file in `js/pages/`
4. **Update design**: Follow Woox Travel color scheme and typography

## 🐛 Troubleshooting

- **Destinations not loading**: Check browser console for errors
- **Calculator not working**: Ensure destination is selected first
- **Styles not applying**: Check CSS file paths in HTML
- **Modal not closing**: Check JavaScript console for errors

---

**Built with ❤️ following Woox Travel design specifications**

