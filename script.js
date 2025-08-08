// Bugify - QA Testing Demo App JavaScript
// This file contains intentional bugs for QA testing demonstration

class BugifyApp {
    constructor() {
        this.tasks = [];
        this.currentFilter = 'all';
        this.currentSort = 'name';
        this.editAttempts = 0; // For edit bug simulation
        this.testingMode = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadSampleData();
        this.render();
    }

    bindEvents() {
        // Add task form
        document.getElementById('addTaskForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTask();
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });

        // Sort dropdown
        document.getElementById('sortBy').addEventListener('change', (e) => {
            this.setSorting(e.target.value);
        });

        // Testing mode toggle
        document.getElementById('testingMode').addEventListener('change', (e) => {
            this.toggleTestingMode(e.target.checked);
        });

        // Modal events
        document.querySelector('.close').addEventListener('click', () => {
            this.closeEditModal();
        });

        document.getElementById('cancelEdit').addEventListener('click', () => {
            this.closeEditModal();
        });

        document.getElementById('editTaskForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveEdit();
        });

        // BUG: Tab navigation - some buttons are missing tabindex
        this.setupAccessibilityBugs();
    }

    setupAccessibilityBugs() {
        // BUG: Remove tabindex from some buttons to simulate accessibility issues
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach((btn, index) => {
            if (index % 3 === 0) {
                btn.setAttribute('tabindex', '-1'); // Makes button non-focusable with tab
            }
        });
    }

    addTask() {
        const titleInput = document.getElementById('taskTitle');
        const dueDateInput = document.getElementById('taskDueDate');
        
        const title = titleInput.value.trim();
        const dueDate = dueDateInput.value.trim();

        // BUG: Allow blank titles (should validate but doesn't)
        // if (!title) {
        //     alert('Please enter a task title');
        //     return;
        // }

        // BUG: Accept invalid date formats and emojis
        // No proper date validation implemented

        const task = {
            id: Date.now() + Math.random(), // Simple ID generation
            title: title || 'Untitled Task', // BUG: Still creates task with blank title
            dueDate: dueDate,
            completed: false,
            createdAt: new Date()
        };

        this.tasks.push(task);
        
        // Clear form
        titleInput.value = '';
        dueDateInput.value = '';
        
        this.render();
        this.showNotification('Task added successfully!', 'success');
    }

    deleteTask(taskId) {
        // BUG: Occasionally delete wrong task (simulate race condition)
        const shouldDeleteWrong = Math.random() < 0.15; // 15% chance of wrong deletion
        
        if (shouldDeleteWrong && this.tasks.length > 1) {
            // Delete a random task instead of the intended one
            const randomIndex = Math.floor(Math.random() * this.tasks.length);
            const deletedTask = this.tasks[randomIndex];
            this.tasks.splice(randomIndex, 1);
            this.showNotification(`Oops! Deleted "${deletedTask.title}" instead!`, 'error');
        } else {
            // Normal deletion
            const taskIndex = this.tasks.findIndex(task => task.id === taskId);
            if (taskIndex !== -1) {
                const deletedTask = this.tasks[taskIndex];
                this.tasks.splice(taskIndex, 1);
                this.showNotification(`Deleted "${deletedTask.title}"`, 'success');
            }
        }
        
        this.render();
    }

    toggleComplete(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            
            // BUG: On mobile, visual update doesn't happen immediately
            if (this.isMobile()) {
                // Simulate delay/failure in visual update
                setTimeout(() => {
                    this.render();
                }, Math.random() < 0.3 ? 2000 : 0); // 30% chance of 2-second delay
            } else {
                this.render();
            }
            
            this.showNotification(
                `Task ${task.completed ? 'completed' : 'marked as pending'}!`, 
                'success'
            );
        }
    }

    editTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            this.currentEditId = taskId;
            document.getElementById('editTaskTitle').value = task.title;
            document.getElementById('editTaskDueDate').value = task.dueDate;
            document.getElementById('editModal').style.display = 'block';
        }
    }

    saveEdit() {
        this.editAttempts++;
        
        // BUG: Edit doesn't save on first try
        if (this.editAttempts === 1) {
            this.showNotification('Save failed. Please try again.', 'error');
            return;
        }

        const task = this.tasks.find(t => t.id === this.currentEditId);
        if (task) {
            task.title = document.getElementById('editTaskTitle').value.trim() || 'Untitled Task';
            task.dueDate = document.getElementById('editTaskDueDate').value.trim();
            
            this.closeEditModal();
            this.render();
            this.showNotification('Task updated successfully!', 'success');
        }
        
        this.editAttempts = 0; // Reset for next edit
    }

    closeEditModal() {
        document.getElementById('editModal').style.display = 'none';
        this.currentEditId = null;
        this.editAttempts = 0;
    }

    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        
        this.render();
    }

    setSorting(sortBy) {
        this.currentSort = sortBy;
        this.render();
    }

    getFilteredTasks() {
        let filtered = [...this.tasks];
        
        // BUG: "Completed" filter shows pending tasks instead
        switch (this.currentFilter) {
            case 'pending':
                filtered = filtered.filter(task => !task.completed);
                break;
            case 'completed':
                // BUG: Shows pending tasks when completed filter is selected
                filtered = filtered.filter(task => !task.completed);
                break;
            case 'all':
            default:
                // Show all tasks
                break;
        }
        
        return filtered;
    }

    getSortedTasks(tasks) {
        return tasks.sort((a, b) => {
            switch (this.currentSort) {
                case 'date':
                    // Sort by due date
                    if (!a.dueDate && !b.dueDate) return 0;
                    if (!a.dueDate) return 1;
                    if (!b.dueDate) return -1;
                    return new Date(a.dueDate) - new Date(b.dueDate);
                case 'name':
                default:
                    return a.title.localeCompare(b.title);
            }
        });
    }

    render() {
        const filteredTasks = this.getFilteredTasks();
        const sortedTasks = this.getSortedTasks(filteredTasks);
        
        const tasksList = document.getElementById('tasksList');
        const emptyState = document.getElementById('emptyState');
        
        if (sortedTasks.length === 0) {
            tasksList.innerHTML = '';
            emptyState.style.display = 'block';
        } else {
            emptyState.style.display = 'none';
            tasksList.innerHTML = sortedTasks.map(task => this.renderTask(task)).join('');
        }
    }

    renderTask(task) {
        const dueDateDisplay = task.dueDate ? 
            `<span class="task-due-date">Due: ${task.dueDate}</span>` : 
            '<span class="task-due-date">No due date</span>';
            
        return `
            <div class="task-item ${task.completed ? 'completed' : ''}">
                <input type="checkbox" class="task-checkbox" 
                       ${task.completed ? 'checked' : ''} 
                       onchange="app.toggleComplete(${task.id})">
                <span class="task-title">${this.escapeHtml(task.title)}</span>
                ${dueDateDisplay}
                <div class="task-actions">
                    <button class="btn btn-secondary" onclick="app.editTask(${task.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-danger" onclick="app.deleteTask(${task.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `;
    }

    toggleTestingMode(enabled) {
        this.testingMode = enabled;
        document.body.classList.toggle('testing-mode', enabled);
        
        if (enabled) {
            this.showNotification('Testing Mode Enabled - Bugs are now highlighted!', 'info');
        } else {
            this.showNotification('Testing Mode Disabled', 'info');
        }
    }

    loadSampleData() {
        // Load some sample tasks for demonstration
        this.tasks = [
            {
                id: 1,
                title: 'Review QA test cases',
                dueDate: '2024-01-15',
                completed: false,
                createdAt: new Date('2024-01-10')
            },
            {
                id: 2,
                title: 'Fix responsive design issues',
                dueDate: '2024-01-20',
                completed: true,
                createdAt: new Date('2024-01-08')
            },
            {
                id: 3,
                title: 'Test mobile compatibility',
                dueDate: '',
                completed: false,
                createdAt: new Date('2024-01-12')
            }
        ];
    }

    showNotification(message, type = 'info') {
        // Simple notification system
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${type === 'error' ? '#e74c3c' : type === 'success' ? '#27ae60' : '#3498db'};
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            z-index: 1001;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }

    isMobile() {
        return window.innerWidth <= 768;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new BugifyApp();
    setupQAFeatures();
});

// Setup QA Features
function setupQAFeatures() {
    // QA Dashboard
    const qaPanelBtn = document.getElementById('qaPanel');
    const qaDashboard = document.getElementById('qaDashboard');
    const closeDashboard = document.getElementById('closeDashboard');
    
    if (qaPanelBtn && qaDashboard && closeDashboard) {
        qaPanelBtn.addEventListener('click', function() {
            qaDashboard.classList.add('active');
        });
        
        closeDashboard.addEventListener('click', function() {
            qaDashboard.classList.remove('active');
        });
    }
    
    // Explore as QA Tester
    const exploreAsQA = document.getElementById('exploreAsQA');
    const qaWalkthrough = document.getElementById('qaWalkthrough');
    const closeWalkthrough = document.getElementById('closeWalkthrough');
    
    if (exploreAsQA && qaWalkthrough && closeWalkthrough) {
        exploreAsQA.addEventListener('click', function() {
            qaWalkthrough.style.display = 'block';
        });
        
        closeWalkthrough.addEventListener('click', function() {
            qaWalkthrough.style.display = 'none';
        });
    }
    
    // Bug Report Modal
    const closeBugReport = document.getElementById('closeBugReport');
    const bugReportModal = document.getElementById('bugReportModal');
    const bugReportForm = document.getElementById('bugReportForm');
    
    if (closeBugReport && bugReportModal && bugReportForm) {
        closeBugReport.addEventListener('click', function() {
            bugReportModal.style.display = 'none';
        });
        
        bugReportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleBugReport();
        });
    }
    
    // Mini Dashboard Toggle
    const toggleMini = document.getElementById('toggleMini');
    const miniContent = document.querySelector('.mini-content');
    
    if (toggleMini && miniContent) {
        toggleMini.addEventListener('click', function() {
            if (miniContent.classList.contains('collapsed')) {
                miniContent.classList.remove('collapsed');
                toggleMini.textContent = '−';
            } else {
                miniContent.classList.add('collapsed');
                toggleMini.textContent = '+';
            }
        });
    }
    
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === qaWalkthrough) {
            qaWalkthrough.style.display = 'none';
        }
        if (e.target === bugReportModal) {
            bugReportModal.style.display = 'none';
        }
    });
}

// Open Bug Report Modal
function openBugReport() {
    const bugReportModal = document.getElementById('bugReportModal');
    if (bugReportModal) {
        bugReportModal.style.display = 'block';
    }
}

// Close Bug Report Modal
function closeBugReportModal() {
    const bugReportModal = document.getElementById('bugReportModal');
    if (bugReportModal) {
        bugReportModal.style.display = 'none';
    }
}

// Handle Bug Report Submission
function handleBugReport() {
    const title = document.getElementById('bugTitle').value;
    const severity = document.getElementById('bugSeverity').value;
    const steps = document.getElementById('bugSteps').value;
    const expected = document.getElementById('bugExpected').value;
    const actual = document.getElementById('bugActual').value;
    
    // Simulate bug report submission
    alert(`🐛 Bug Report Submitted Successfully!\n\n` +
          `Title: ${title}\n` +
          `Severity: ${severity.toUpperCase()}\n\n` +
          `This demonstrates professional bug reporting workflow.\n` +
          `In a real scenario, this would be sent to your bug tracking system (Jira, Azure DevOps, etc.).`);
    
    // Reset form and close modal
    document.getElementById('bugReportForm').reset();
    closeBugReportModal();
}

// Download Functions (Simulated)
function downloadTestPlan() {
    alert('📄 Test Plan PDF Download\n\n' +
          'In a real scenario, this would download a comprehensive test plan document.\n\n' +
          'For this demo, you can view the test-plan.md file in the project folder.\n\n' +
          'This demonstrates QA documentation and deliverables.');
}

function downloadTestCases() {
    alert('📋 Test Cases PDF Download\n\n' +
          'In a real scenario, this would download detailed test cases with:\n' +
          '• Test steps\n' +
          '• Expected results\n' +
          '• Test data\n' +
          '• Prerequisites\n\n' +
          'For this demo, view the test-cases.md file.');
}

function downloadBugReport() {
    alert('🐛 Bug Report PDF Download\n\n' +
          'In a real scenario, this would download a professional bug report with:\n' +
          '• Bug descriptions\n' +
          '• Severity classifications\n' +
          '• Steps to reproduce\n' +
          '• Screenshots/evidence\n\n' +
          'This demonstrates comprehensive QA documentation.');
}

// Additional bugs for testing
window.addEventListener('resize', () => {
    // BUG: App doesn't handle resize events properly
    // This could cause layout issues when rotating mobile devices
});

// BUG: Global error handling is missing
// Uncomment the line below to see unhandled errors
// setTimeout(() => { throw new Error('Simulated unhandled error for testing'); }, 10000);