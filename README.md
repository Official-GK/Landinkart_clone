# Personal Loan Website

A modern, responsive personal loan website built with HTML, CSS, and JavaScript. This project provides a comprehensive platform for users to explore loan options, calculate EMIs, and learn about various financial products.

## 🚀 Features

- **Responsive Design**: Fully responsive layout that works on all devices (mobile, tablet, desktop)
- **Loan Calculator**: Interactive EMI calculator with real-time updates
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Multiple Sections**: Hero section, features, testimonials, partner logos, and more
- **Accessibility**: Built with accessibility best practices
- **Cross-browser Compatible**: Works on all modern browsers

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1439px
- **Large Desktop**: 1440px+

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript**: Interactive functionality
- **Git**: Version control

## 📁 Project Structure

```
├── index.html              # Main HTML file
├── css/
│   ├── LandingPage.css     # Main stylesheet
│   └── navbar.css          # Navigation styles
├── js/
│   └── script.js           # JavaScript functionality
├── images/                 # Image assets
├── README.md              # Project documentation
└── .gitignore             # Git ignore file
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/personal-loan-website.git
   cd personal-loan-website
   ```

2. **Open the project**
   - Simply open `index.html` in your web browser
   - Or use a local server for development

3. **For development with a local server**
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   ```

## 📱 Responsive Features

### Mobile Optimizations
- Touch-friendly interface with 48px minimum touch targets
- Optimized font sizes for readability
- Simplified navigation with hamburger menu
- Stacked layouts for better mobile experience

### Tablet & Desktop Features
- Multi-column layouts
- Enhanced hover effects
- Larger interactive elements
- Optimized spacing and typography

## 🎨 Design System

### Colors
- **Primary**: #023347 (Dark Blue)
- **Secondary**: #2a8e9e (Teal)
- **Background**: Linear gradient (#e7f7fe to #b6e7fc)
- **Text**: #333333 (Dark Gray)

### Typography
- **Primary Font**: Inter, Open Sans, sans-serif
- **Base Font Size**: 16px
- **Responsive Scaling**: 1rem - 2.8rem

## 🔧 Customization

### Adding New Sections
1. Create HTML structure in `index.html`
2. Add corresponding CSS in `LandingPage.css`
3. Include responsive breakpoints for all screen sizes

### Modifying Colors
Update CSS custom properties in the root selector:
```css
:root {
  --primary-color: #023347;
  --secondary-color: #2a8e9e;
  --background-gradient: linear-gradient(117.55deg, #e7f7fe, #b6e7fc);
}
```

## 📊 Performance Optimizations

- Optimized images with proper formats (WebP, JPEG)
- Minified CSS and JavaScript for production
- Efficient CSS Grid and Flexbox layouts
- Lazy loading for images
- Reduced motion support for accessibility

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

If you have any questions or need support, please open an issue on GitHub or contact the development team.

## 🚀 Deployment

### GitHub Pages
1. Push your code to GitHub
2. Go to repository Settings > Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://username.github.io/repository-name`

### Netlify
1. Connect your GitHub repository to Netlify
2. Deploy automatically on every push
3. Get a custom domain and SSL certificate

### Vercel
1. Import your GitHub repository to Vercel
2. Automatic deployments on every commit
3. Preview deployments for pull requests

---

**Made with ❤️ for better financial experiences** 