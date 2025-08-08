# Buggyfy - QA Testing Demo App

## 🐛 About Buggyfy

Buggyfy is an intentionally buggy to-do manager application designed to showcase QA testing skills and methodologies. This app contains **8 carefully crafted bugs** that demonstrate various types of issues commonly found in web applications.

## 🎯 Purpose

This application serves as a **QA portfolio piece** to demonstrate:
- Manual testing skills
- Test case writing
- Bug identification and reporting
- Understanding of different bug types
- QA documentation practices

## 🚀 Features

### Core Functionality
- ✅ Add new tasks with title and optional due date
- ✅ Edit existing tasks
- ✅ Delete tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Filter tasks (All/Pending/Completed)
- ✅ Sort tasks by name or due date
- ✅ Responsive design for mobile and desktop

### Testing Features
- 🔍 **Testing Mode Toggle** - Highlights known bugs
- 📊 **Bug Counter** - Shows number of intentional bugs
- 🎯 **Bug Indicators** - Visual markers for each bug type
- 📱 **Cross-platform Testing** - Mobile and desktop compatibility

## 🐛 Intentional Bugs Included

| Bug ID | Feature | Description | Severity | Type |
|--------|---------|-------------|----------|------|
| BUG-001 | Add Task | Allows blank task titles | Medium | Validation |
| BUG-002 | Edit Task | Edits don't save on first attempt | High | Functional |
| BUG-003 | Delete Task | Occasionally deletes wrong task | Critical | Data Integrity |
| BUG-004 | Mark Complete | Visual update delayed on mobile | Medium | UI/UX |
| BUG-005 | Filter | "Completed" filter shows pending tasks | High | Logic Error |
| BUG-006 | Responsive | UI breaks on small screens | Medium | Responsive Design |
| BUG-007 | Accessibility | Tab navigation skips buttons | Medium | Accessibility |
| BUG-008 | Input Validation | Accepts invalid date formats | Low | Validation |

## 📋 QA Documentation

This project includes comprehensive QA documentation:

- **Test Plan** (`test-plan.md`) - Overall testing strategy
- **Test Cases** (`test-cases.md`) - Detailed test scenarios
- **Bug Reports** (`bug-reports.md`) - Professional bug documentation
- **Test Results** (`test-results.md`) - Execution results and metrics

## 🛠️ How to Use

1. **Open the App**: Launch `index.html` in your browser
2. **Enable Testing Mode**: Toggle the "Testing Mode" switch to see bug indicators
3. **Explore Features**: Try adding, editing, deleting, and filtering tasks
4. **Observe Bugs**: Notice the intentional issues highlighted in testing mode
5. **Review Documentation**: Check the QA documents for professional testing approach

## 🎯 QA Skills Demonstrated

### Manual Testing
- Functional testing of all features
- UI/UX testing across devices
- Accessibility testing
- Cross-browser compatibility
- Edge case identification

### Test Documentation
- Comprehensive test planning
- Detailed test case writing
- Professional bug reporting
- Test execution tracking
- Metrics and reporting

### Bug Types Covered
- **Functional Bugs** - Features not working as expected
- **UI/UX Issues** - Visual and interaction problems
- **Data Integrity** - Incorrect data handling
- **Validation Errors** - Missing or improper input validation
- **Responsive Design** - Layout issues on different screen sizes
- **Accessibility** - Keyboard navigation and usability issues

## 🔧 Technical Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: CSS Grid, Flexbox, Custom animations
- **Icons**: Font Awesome
- **Responsive**: Mobile-first design approach
- **Testing**: Manual testing with documented processes

## 📱 Browser Support

Tested on:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎨 Design Features

- Modern, clean interface
- Intuitive user experience
- Visual feedback for actions
- Responsive grid layout
- Accessibility considerations
- Testing mode overlay

## 📊 Testing Metrics

- **Total Test Cases**: 25
- **Known Bugs**: 8
- **Bug Detection Rate**: 100%
- **Test Coverage**: All major features
- **Platforms Tested**: Desktop + Mobile

## 🚀 Getting Started

1. Clone or download the project
2. Open `index.html` in a web browser
3. Toggle "Testing Mode" to see bug indicators
4. Review the QA documentation files
5. Use as a portfolio demonstration piece

## 💼 Portfolio Integration

This app can be:
- Added to your portfolio website
- Demonstrated in QA interviews
- Used to show testing methodologies
- Referenced in job applications
- Shared with potential employers

## 📝 License

This project is created for educational and portfolio purposes. Feel free to use and modify for your own QA demonstrations.

---

**Created by**: [Your Name]  
**Purpose**: QA Testing Portfolio Demonstration  
**Date**: January 2024  
**Version**: 1.0