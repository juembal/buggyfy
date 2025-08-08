# Buggyfy - Test Cases

## Test Case Documentation

### Document Information
- **Project**: Bugify - QA Testing Demo App
- **Version**: 1.0
- **Date**: January 2024
- **Author**: [Your Name]

---

## TC-001: Add Task with Valid Title

**Test Objective**: Verify that users can successfully add a task with a valid title

**Preconditions**: 
- Application is loaded
- User is on the main page

**Test Steps**:
1. Navigate to "Add New Task" section
2. Enter "Complete project documentation" in the Task Title field
3. Leave Due Date field empty
4. Click "Add Task" button

**Expected Result**: 
- Task is successfully added to the task list
- Task appears with title "Complete project documentation"
- Success notification is displayed
- Form fields are cleared

**Test Data**: 
- Task Title: "Complete project documentation"
- Due Date: (empty)

**Priority**: High
**Severity**: High

---

## TC-002: Add Task with Blank Title (Bug Test)

**Test Objective**: Verify validation when attempting to add a task with blank title

**Preconditions**: 
- Application is loaded
- User is on the main page

**Test Steps**:
1. Navigate to "Add New Task" section
2. Leave Task Title field empty
3. Enter "2024-01-15" in Due Date field
4. Click "Add Task" button

**Expected Result**: 
- Validation error should appear
- Task should not be added
- Error message: "Please enter a task title"

**Actual Result** (Intentional Bug):
- Task is added with title "Untitled Task"
- No validation error shown
- Form is cleared

**Test Data**: 
- Task Title: (empty)
- Due Date: "2024-01-15"

**Priority**: Medium
**Severity**: Medium
**Bug ID**: BUG-001

---

## TC-003: Add Task with Valid Due Date

**Test Objective**: Verify that users can add a task with a valid due date

**Preconditions**: 
- Application is loaded
- User is on the main page

**Test Steps**:
1. Navigate to "Add New Task" section
2. Enter "Review test cases" in Task Title field
3. Enter "2024-01-20" in Due Date field
4. Click "Add Task" button

**Expected Result**: 
- Task is successfully added
- Due date is displayed as "Due: 2024-01-20"
- Success notification appears

**Test Data**: 
- Task Title: "Review test cases"
- Due Date: "2024-01-20"

**Priority**: High
**Severity**: High

---

## TC-004: Add Task with Invalid Date Format (Bug Test)

**Test Objective**: Verify validation for invalid date formats

**Preconditions**: 
- Application is loaded
- User is on the main page

**Test Steps**:
1. Navigate to "Add New Task" section
2. Enter "Test invalid date" in Task Title field
3. Enter "invalid-date-123" in Due Date field
4. Click "Add Task" button

**Expected Result**: 
- Validation error should appear
- Task should not be added
- Error message about invalid date format

**Actual Result** (Intentional Bug):
- Task is added with invalid date
- No validation performed
- Invalid date is displayed as-is

**Test Data**: 
- Task Title: "Test invalid date"
- Due Date: "invalid-date-123"

**Priority**: Low
**Severity**: Low
**Bug ID**: BUG-008

---

## TC-005: Edit Task Successfully

**Test Objective**: Verify that users can edit an existing task

**Preconditions**: 
- Application is loaded
- At least one task exists in the list

**Test Steps**:
1. Locate an existing task in the task list
2. Click the "Edit" button for that task
3. Modify the task title to "Updated task title"
4. Change the due date to "2024-01-25"
5. Click "Save Changes" button

**Expected Result**: 
- Edit modal opens with current task data
- Changes are saved successfully
- Modal closes
- Task list shows updated information
- Success notification appears

**Test Data**: 
- Original Title: "Review test cases"
- New Title: "Updated task title"
- New Due Date: "2024-01-25"

**Priority**: High
**Severity**: High

---

## TC-006: Edit Task - First Attempt Fails (Bug Test)

**Test Objective**: Verify edit functionality works on first attempt

**Preconditions**: 
- Application is loaded
- At least one task exists in the list

**Test Steps**:
1. Click "Edit" button on any task
2. Modify the task title
3. Click "Save Changes" button (first attempt)
4. Observe the result

**Expected Result**: 
- Changes should be saved on first attempt
- Success notification should appear
- Modal should close

**Actual Result** (Intentional Bug):
- First save attempt fails
- Error message: "Save failed. Please try again."
- Modal remains open
- Second attempt succeeds

**Test Data**: 
- Task Title: "Modified on first try"

**Priority**: High
**Severity**: High
**Bug ID**: BUG-002

---

## TC-007: Delete Task Successfully

**Test Objective**: Verify that users can delete a task

**Preconditions**: 
- Application is loaded
- At least one task exists in the list

**Test Steps**:
1. Locate a task in the task list
2. Note the task title for verification
3. Click the "Delete" button for that task
4. Observe the result

**Expected Result**: 
- Selected task is removed from the list
- Success notification shows correct deleted task
- Task count decreases by 1

**Test Data**: 
- Task to delete: Any existing task

**Priority**: High
**Severity**: Critical

---

## TC-008: Delete Task - Wrong Task Deleted (Bug Test)

**Test Objective**: Verify delete functionality removes correct task

**Preconditions**: 
- Application is loaded
- Multiple tasks exist in the list

**Test Steps**:
1. Create multiple tasks with distinct titles
2. Note the titles of all tasks
3. Click "Delete" on a specific task
4. Repeat multiple times to trigger the bug

**Expected Result**: 
- Only the selected task should be deleted
- Notification should show correct deleted task

**Actual Result** (Intentional Bug):
- Occasionally deletes a different task (15% chance)
- Notification shows wrong deleted task
- Data integrity is compromised

**Test Data**: 
- Multiple tasks with unique titles

**Priority**: Critical
**Severity**: Critical
**Bug ID**: BUG-003

---

## TC-009: Mark Task as Complete

**Test Objective**: Verify that users can mark tasks as complete

**Preconditions**: 
- Application is loaded
- At least one incomplete task exists

**Test Steps**:
1. Locate an incomplete task (checkbox unchecked)
2. Click the checkbox next to the task
3. Observe the visual changes

**Expected Result**: 
- Checkbox becomes checked
- Task title gets strikethrough styling
- Task opacity decreases
- Success notification appears
- Change is immediate

**Test Data**: 
- Any incomplete task

**Priority**: High
**Severity**: Medium

---

## TC-010: Mark Complete - Mobile Delay (Bug Test)

**Test Objective**: Verify task completion works immediately on mobile

**Preconditions**: 
- Application is loaded on mobile device or mobile view
- At least one incomplete task exists

**Test Steps**:
1. Switch to mobile view (width < 768px)
2. Click checkbox on an incomplete task
3. Observe timing of visual update

**Expected Result**: 
- Visual update should be immediate
- No delay in UI changes

**Actual Result** (Intentional Bug):
- 30% chance of 2-second delay in visual update
- Checkbox state changes but styling delayed
- Poor user experience on mobile

**Test Data**: 
- Mobile viewport (< 768px width)
- Any incomplete task

**Priority**: Medium
**Severity**: Medium
**Bug ID**: BUG-004

---

## TC-011: Filter All Tasks

**Test Objective**: Verify "All" filter shows all tasks

**Preconditions**: 
- Application is loaded
- Mix of completed and pending tasks exist

**Test Steps**:
1. Ensure there are both completed and pending tasks
2. Click "All" filter button
3. Observe displayed tasks

**Expected Result**: 
- All tasks (completed and pending) are displayed
- Filter button shows active state
- Task count matches total tasks

**Test Data**: 
- Mix of completed and pending tasks

**Priority**: Medium
**Severity**: Medium

---

## TC-012: Filter Pending Tasks

**Test Objective**: Verify "Pending" filter shows only incomplete tasks

**Preconditions**: 
- Application is loaded
- Mix of completed and pending tasks exist

**Test Steps**:
1. Ensure there are both completed and pending tasks
2. Click "Pending" filter button
3. Observe displayed tasks

**Expected Result**: 
- Only pending (incomplete) tasks are displayed
- Completed tasks are hidden
- Filter button shows active state

**Test Data**: 
- Mix of completed and pending tasks

**Priority**: Medium
**Severity**: Medium

---

## TC-013: Filter Completed Tasks (Bug Test)

**Test Objective**: Verify "Completed" filter shows only completed tasks

**Preconditions**: 
- Application is loaded
- Mix of completed and pending tasks exist

**Test Steps**:
1. Ensure there are both completed and pending tasks
2. Click "Completed" filter button
3. Observe displayed tasks

**Expected Result**: 
- Only completed tasks should be displayed
- Pending tasks should be hidden

**Actual Result** (Intentional Bug):
- Shows pending tasks instead of completed tasks
- Filter logic is inverted
- Completed tasks are hidden when they should be shown

**Test Data**: 
- Mix of completed and pending tasks

**Priority**: High
**Severity**: High
**Bug ID**: BUG-005

---

## TC-014: Sort Tasks by Name

**Test Objective**: Verify tasks can be sorted alphabetically by name

**Preconditions**: 
- Application is loaded
- Multiple tasks with different names exist

**Test Steps**:
1. Create tasks with names: "Zebra task", "Alpha task", "Beta task"
2. Select "Name" from the Sort dropdown
3. Observe task order

**Expected Result**: 
- Tasks are sorted alphabetically
- Order: "Alpha task", "Beta task", "Zebra task"

**Test Data**: 
- Tasks: "Zebra task", "Alpha task", "Beta task"

**Priority**: Low
**Severity**: Low

---

## TC-015: Sort Tasks by Due Date

**Test Objective**: Verify tasks can be sorted by due date

**Preconditions**: 
- Application is loaded
- Multiple tasks with different due dates exist

**Test Steps**:
1. Create tasks with due dates: "2024-01-25", "2024-01-15", "2024-01-20"
2. Select "Due Date" from the Sort dropdown
3. Observe task order

**Expected Result**: 
- Tasks are sorted by due date (earliest first)
- Order: 2024-01-15, 2024-01-20, 2024-01-25
- Tasks without due dates appear last

**Test Data**: 
- Due dates: "2024-01-25", "2024-01-15", "2024-01-20"

**Priority**: Low
**Severity**: Low

---

## TC-016: Responsive Design - Desktop

**Test Objective**: Verify application layout on desktop screens

**Preconditions**: 
- Application is loaded
- Browser width > 1024px

**Test Steps**:
1. Set browser width to 1200px
2. Observe layout and component positioning
3. Test all functionality

**Expected Result**: 
- All elements are properly positioned
- No horizontal scrolling required
- All features accessible and functional

**Test Data**: 
- Screen width: 1200px

**Priority**: Medium
**Severity**: Medium

---

## TC-017: Responsive Design - Mobile (Bug Test)

**Test Objective**: Verify application layout on mobile screens

**Preconditions**: 
- Application is loaded
- Browser width < 768px

**Test Steps**:
1. Set browser width to 375px (mobile)
2. Observe layout and component positioning
3. Test task actions and buttons

**Expected Result**: 
- Layout should adapt to mobile screen
- All buttons should be accessible
- No content should be cut off

**Actual Result** (Intentional Bug):
- Task action buttons overlap and go off-screen
- Grid layout breaks on mobile
- Some content becomes inaccessible

**Test Data**: 
- Screen width: 375px

**Priority**: Medium
**Severity**: Medium
**Bug ID**: BUG-006

---

## TC-018: Keyboard Navigation (Bug Test)

**Test Objective**: Verify all interactive elements are keyboard accessible

**Preconditions**: 
- Application is loaded
- User is using keyboard only (no mouse)

**Test Steps**:
1. Use Tab key to navigate through all interactive elements
2. Try to reach all buttons and form fields
3. Note any elements that cannot be focused

**Expected Result**: 
- All buttons and form fields should be focusable
- Tab order should be logical
- No elements should be skipped

**Actual Result** (Intentional Bug):
- Some buttons have tabindex="-1" and are skipped
- Tab navigation is incomplete
- Accessibility is compromised

**Test Data**: 
- Keyboard navigation only

**Priority**: Medium
**Severity**: Medium
**Bug ID**: BUG-007

---

## TC-019: Testing Mode Toggle

**Test Objective**: Verify testing mode functionality

**Preconditions**: 
- Application is loaded

**Test Steps**:
1. Locate "Testing Mode" toggle in header
2. Click to enable testing mode
3. Observe changes in UI
4. Click to disable testing mode

**Expected Result**: 
- Bug indicators become visible when enabled
- Testing panel appears on right side
- Bug indicators hide when disabled
- Notification appears for mode changes

**Test Data**: 
- Testing mode toggle

**Priority**: Low
**Severity**: Low

---

## TC-020: Cross-Browser Compatibility - Chrome

**Test Objective**: Verify application works correctly in Chrome

**Preconditions**: 
- Chrome browser (version 90+)
- Application loaded

**Test Steps**:
1. Open application in Chrome
2. Test all core functionality
3. Check for console errors
4. Verify visual appearance

**Expected Result**: 
- All features work as expected
- No console errors
- Visual design renders correctly

**Test Data**: 
- Chrome browser

**Priority**: High
**Severity**: High

---

## TC-021: Cross-Browser Compatibility - Firefox

**Test Objective**: Verify application works correctly in Firefox

**Preconditions**: 
- Firefox browser (version 88+)
- Application loaded

**Test Steps**:
1. Open application in Firefox
2. Test all core functionality
3. Check for console errors
4. Verify visual appearance

**Expected Result**: 
- All features work as expected
- No console errors
- Visual design renders correctly

**Test Data**: 
- Firefox browser

**Priority**: High
**Severity**: High

---

## TC-022: Cross-Browser Compatibility - Safari

**Test Objective**: Verify application works correctly in Safari

**Preconditions**: 
- Safari browser (version 14+)
- Application loaded

**Test Steps**:
1. Open application in Safari
2. Test all core functionality
3. Check for console errors
4. Verify visual appearance

**Expected Result**: 
- All features work as expected
- No console errors
- Visual design renders correctly

**Test Data**: 
- Safari browser

**Priority**: High
**Severity**: High

---

## TC-023: Empty State Display

**Test Objective**: Verify empty state is shown when no tasks exist

**Preconditions**: 
- Application is loaded
- No tasks exist in the list

**Test Steps**:
1. Ensure task list is empty (delete all tasks if needed)
2. Observe the task list area

**Expected Result**: 
- Empty state message is displayed
- Icon and text: "No tasks yet. Add your first task above!"
- Add task form is still accessible

**Test Data**: 
- Empty task list

**Priority**: Low
**Severity**: Low

---

## TC-024: Task Data Persistence

**Test Objective**: Verify task data persists during session

**Preconditions**: 
- Application is loaded

**Test Steps**:
1. Add several tasks with different data
2. Perform various operations (edit, complete, filter)
3. Refresh the page
4. Check if data is maintained

**Expected Result**: 
- Tasks persist during the session
- All task states are maintained
- No data loss occurs

**Note**: This app uses in-memory storage, so data resets on page refresh

**Test Data**: 
- Multiple tasks with various states

**Priority**: Medium
**Severity**: Medium

---

## TC-025: Notification System

**Test Objective**: Verify notification system works for all actions

**Preconditions**: 
- Application is loaded

**Test Steps**:
1. Perform each action that should trigger a notification:
   - Add task
   - Edit task
   - Delete task
   - Mark complete/incomplete
   - Toggle testing mode
2. Observe notification appearance and content

**Expected Result**: 
- Appropriate notification appears for each action
- Notifications auto-dismiss after 3 seconds
- Notification content is accurate
- Notifications don't overlap

**Test Data**: 
- Various user actions

**Priority**: Low
**Severity**: Low

---

## Test Execution Summary

**Total Test Cases**: 25
**Functional Tests**: 15
**Bug Tests**: 8
**Compatibility Tests**: 3
**UI/UX Tests**: 4

**Coverage Areas**:
- ✅ Task Management (Add, Edit, Delete, Complete)
- ✅ Filtering and Sorting
- ✅ Responsive Design
- ✅ Cross-browser Compatibility
- ✅ Accessibility
- ✅ Input Validation
- ✅ User Interface
- ✅ Testing Mode Features

---

**Prepared by**: [Your Name]  
**Date**: January 2024  
**Version**: 1.0