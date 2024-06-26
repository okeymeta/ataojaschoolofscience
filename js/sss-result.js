// Sample student results data (replace this with your server-side storage)
let studentResults = [];

function addStudentResult(fullName, passkey, results) {
    studentResults.push({ fullName, passkey, results });
}

function getStudentResult(fullName, passkey) {
    return studentResults.find(student => student.fullName === fullName && student.passkey === passkey);
}

function checkResult() {
    var fullName = document.getElementById('fullName').value;
    var passkey = document.getElementById('passkey').value;

    

    var student = getStudentResult(fullName, passkey);

    if (student) {
        showResult(student);
    } else {
        alert('Invalid credentials. Please check your full name and passkey.');
    }

    // Get the selected class directly from the dropdown
    var selectedClass = document.getElementById('classDropdown').value;

     // Display the selected class in the result
     var expectedClass = document.getElementById('expectedClass');
     expectedClass.textContent = 'Class: ' + selectedClass;
 
     // Add more details to the result as needed
     // ...
 
     // Example: Display an alert with the selected class and passkey
     alert(`Class: ${selectedClass}, Passkey: ${passkey}`);
}

function showResult(student) {
    var resultContainer = document.getElementById('resultContainer');
    var resultBody = document.getElementById('resultBody');
    var expectedName = document.getElementById('expectedName');
    var reportName = document.getElementById('reportName');
    var percentageElement = document.getElementById('percentage');
    var principalCommentElement = document.getElementById('principalComment');
    var classTeacherCommentElement = document.getElementById('classTeacherComment');
    

    // Add a button to trigger PNG download
    var saveAsPNGButton = document.createElement('button');
    saveAsPNGButton.textContent = 'Save Result as PNG';
    saveAsPNGButton.onclick = saveResultAsPNG;
    saveAsPNGButton.id = 'saveAsPNGButton'; // Assign an id to the button
    resultContainer.appendChild(saveAsPNGButton);

    // Add a button to trigger PDF download
var saveAsPDFButton = document.createElement('button');
saveAsPDFButton.textContent = 'Save Result as PDF';
saveAsPDFButton.onclick = saveResultAsPDF; // Call the saveResultAsPDF function when clicked
saveAsPDFButton.id = 'saveAsPDFButton'; // Assign an id to the button
resultContainer.appendChild(saveAsPDFButton);



    // Clear previous result if any
    resultBody.innerHTML = '';

    // Populate result table dynamically
    student.results.forEach(function (result) {
        var total = result.firstCA + result.secondCA + result.thirdCA + result.exam;
        var grade = calculateGrade(total);
        var remarks = calculateRemarks(grade);
        var row = document.createElement('tr');
        row.innerHTML = `
            <td>${result.subject}</td>
            <td>${result.firstCA}</td>
            <td>${result.secondCA}</td>
            <td>${result.thirdCA}</td>
            <td>${result.exam}</td>
            <td>${total}</td>
            <td>${grade}</td>
            <td>${remarks}</td>
        `;
        resultBody.appendChild(row);
    });

    // Display additional details
    expectedName.textContent = 'Student Name: ' + student.fullName;
    reportName.textContent = 'Student eReport Card';
    percentageElement.textContent = 'Overall Percentage: ' + calculatePercentage(student.results);

    
    
   

    // Display the result container
    resultContainer.style.display = 'block'; 

   // Generate and display comments
   var principalComment = generatePrincipalComment(student.results);
   var classTeacherComment = generateClassTeacherComment(student.results);

   document.getElementById('principalComment').textContent = 'Principal\'s Comment: ' + principalComment;
   document.getElementById('classTeacherComment').textContent = 'Class Teacher\'s Comment: ' + classTeacherComment;
}

function generatePrincipalComment(results) {
   var averagePercentage = calculatePercentage(results);
   var principalComment = '';

   if (averagePercentage >= 80.00) {
       principalComment = 'Excellent performance! Keep up the good work.';
   } else if (averagePercentage >= 60.00) {
       principalComment = 'Good effort. Continue to strive for improvement.';
   } else {
       principalComment = 'There is room for improvement. Let\'s work together to enhance your performance.';
   }

   return principalComment;
}

function generateClassTeacherComment(results) {
   // You can customize this based on your criteria
   // For simplicity, let's assume the class teacher provides the same comment for all students
   return 'Consistent effort and participation. Well done!';
 
    
}

// Helper functions (unchanged from previous version)
function calculateGrade(total) {
    if (total >= 91 && total <= 100) {
        return 'A++';
    } else if (total >= 81 && total <= 90) {
        return 'A+';
    } else if (total >= 71 && total <= 80) {
        return 'A';
    } else if (total >= 61 && total <= 70) {
        return 'B+';
    } else if (total >= 51 && total <= 60) {
        return 'B';
    } else if (total >= 35 && total <= 50) {
        return 'C';
    } else if (total >= 0 && total <= 34) {
        return 'Fail';
    } else {
        return 'Invalid Score';
    }
}

function calculateRemarks(grade) {
    switch (grade) {
        case 'A++':
            return 'Outstanding';
        case 'A+':
            return 'Excellent';
        case 'A':
            return 'Very Good';
        case 'B+':
            return 'Good';
        case 'B':
            return 'Average';
        case 'C':
            return 'Fair';
        case 'Fail':
            return 'Need Attention';
        default:
            return '';
    }
}


function calculatePercentage(results) {
    var totalMarks = results.reduce(function (acc, result) {
        return acc + result.firstCA + result.secondCA + result.thirdCA + result.exam;
    }, 0);
    var maxMarks = results.length * 100; // Assuming each subject has a maximum of 100 marks
    var percentage = (totalMarks / maxMarks) * 100;
    return percentage.toFixed(2) + '%';

    
}

// Class: SSS 1
addStudentResult('John Doe', 'ataoja' + ('0' + new Date().getDate()).slice(-2) + new Date().getFullYear() + ('0' + (new Date().getMonth() + 1)).slice(-2), [
    { subject: 'Accounts', firstCA: 85, secondCA: 90, thirdCA: 0, exam: 75 },
    { subject: 'Agricultural Scince', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Animal Husbandry', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Biology', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Catering & Craft', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Chemistry', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Civic', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Data Processing', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Economics', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'English Language', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Further Mathematics', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Food & Nutrition', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Geography', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Mathematics', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Physics', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 }
]);

addStudentResult('Jane Smith', 'ataoja' + ('0' + new Date().getDate()).slice(-2) + new Date().getFullYear() + ('0' + (new Date().getMonth() + 1)).slice(-2), [
    { subject: 'Accounts', firstCA: 85, secondCA: 90, thirdCA: 0, exam: 75 },
    { subject: 'Agricultural Scince', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Animal Husbandry', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Biology', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Catering & Craft', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Chemistry', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Civic', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Data Processing', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Economics', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'English Language', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Further Mathematics', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Food & Nutrition', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Geography', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Mathematics', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Physics', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 }
]);

addStudentResult('Okechukwu Nwaozo', 'ataoja' + ('0' + new Date().getDate()).slice(-2) + new Date().getFullYear() + ('0' + (new Date().getMonth() + 1)).slice(-2), [
    { subject: 'Accounts', firstCA: 85, secondCA: 90, thirdCA: 0, exam: 75 },
    { subject: 'Agricultural Scince', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Animal Husbandry', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Biology', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Catering & Craft', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Chemistry', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Civic', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Data Processing', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Economics', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'English Language', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Further Mathematics', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Food & Nutrition', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Geography', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Mathematics', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Physics', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 }
]);

addStudentResult('Goodnews Nwaozor', 'ataoja' + ('0' + new Date().getDate()).slice(-2) + new Date().getFullYear() + ('0' + (new Date().getMonth() + 1)).slice(-2), [
    { subject: 'Accounts', firstCA: 85, secondCA: 90, thirdCA: 0, exam: 75 },
    { subject: 'Agricultural Scince', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Animal Husbandry', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Biology', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Catering & Craft', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Chemistry', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Civic', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Data Processing', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Economics', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'English Language', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Further Mathematics', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Food & Nutrition', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Geography', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Mathematics', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Physics', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 }
]);

// Class: SSS 2
addStudentResult('John Doe', 'ataoja' + ('0' + new Date().getDate()).slice(-2) + new Date().getFullYear() + ('0' + (new Date().getMonth() + 1)).slice(-2), [
    { subject: 'Accounts', firstCA: 85, secondCA: 90, thirdCA: 0, exam: 75 },
    { subject: 'Agricultural Scince', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Animal Husbandry', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Biology', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Catering & Craft', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Chemistry', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Civic', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Data Processing', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Economics', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'English Language', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Further Mathematics', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Food & Nutrition', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Geography', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Mathematics', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Physics', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 }
]);

addStudentResult('Jane Smith', 'ataoja' + ('0' + new Date().getDate()).slice(-2) + new Date().getFullYear() + ('0' + (new Date().getMonth() + 1)).slice(-2), [
    { subject: 'Accounts', firstCA: 85, secondCA: 90, thirdCA: 0, exam: 75 },
    { subject: 'Agricultural Scince', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Animal Husbandry', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Biology', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Catering & Craft', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Chemistry', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Civic', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Data Processing', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Economics', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'English Language', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Further Mathematics', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Food & Nutrition', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Geography', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Mathematics', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Physics', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 }
]);

addStudentResult('Okechukwu Nwaozor', 'ataoja' + ('0' + new Date().getDate()).slice(-2) + new Date().getFullYear() + ('0' + (new Date().getMonth() + 1)).slice(-2), [
    { subject: 'Accounts', firstCA: 10, secondCA: 10, thirdCA: 0, exam: 60 },
    { subject: 'Agricultural Scince', firstCA: 10, secondCA: 10, thirdCA: 0, exam: 60 },
    { subject: 'Animal Husbandry', firstCA: 10, secondCA: 10, thirdCA: 0, exam: 60 },
    { subject: 'Biology', firstCA: 10, secondCA: 10, thirdCA: 0, exam: 60 },
    { subject: 'Catering & Craft', firstCA: 10, secondCA: 10, thirdCA: 0, exam: 60 },
    { subject: 'Chemistry', firstCA: 10, secondCA: 10, thirdCA: 0, exam: 60 },
    { subject: 'Civic', firstCA: 10, secondCA: 10, thirdCA: 0, exam: 60 },
    { subject: 'Data Processing', firstCA: 10, secondCA: 10, thirdCA: 0, exam: 70 },
    { subject: 'Economics', firstCA: 10, secondCA: 10, thirdCA: 0, exam: 60 },
    { subject: 'English Language', firstCA: 20, secondCA: 20, thirdCA: 0, exam: 60 },
    { subject: 'Further Mathematics', firstCA: 10, secondCA: 10, thirdCA: 0, exam: 60 },
    { subject: 'Food & Nutrition', firstCA: 10, secondCA: 10, thirdCA: 0, exam: 60 },
    { subject: 'Geography', firstCA: null, secondCA: null, thirdCA: null, exam: null },
    { subject: 'Mathematics', firstCA: 10, secondCA: 10, thirdCA: 0, exam: 70 },
    { subject: 'Physics', firstCA: 10, secondCA: 10, thirdCA: 0, exam: 60 }
]);

addStudentResult('Goodnews Nwaozor', 'ataoja' + ('0' + new Date().getDate()).slice(-2) + new Date().getFullYear() + ('0' + (new Date().getMonth() + 1)).slice(-2), [
    { subject: 'Accounts', firstCA: 85, secondCA: 90, thirdCA: 0, exam: 75 },
    { subject: 'Agricultural Scince', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Animal Husbandry', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Biology', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Catering & Craft', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Chemistry', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Civic', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Data Processing', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Economics', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'English Language', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Further Mathematics', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Food & Nutrition', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Geography', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Mathematics', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Physics', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 }
]);


// Class: SSS 3
addStudentResult('John Doe', 'ataoja' + ('0' + new Date().getDate()).slice(-2) + new Date().getFullYear() + ('0' + (new Date().getMonth() + 1)).slice(-2), [
    { subject: 'Accounts', firstCA: 85, secondCA: 90, thirdCA: 0, exam: 75 },
    { subject: 'Agricultural Scince', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Animal Husbandry', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Biology', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Catering & Craft', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Chemistry', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Civic', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Data Processing', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Economics', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'English Language', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Further Mathematics', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Food & Nutrition', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Geography', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Mathematics', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Physics', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 }
]);

addStudentResult('Jane Smith', 'ataoja' + ('0' + new Date().getDate()).slice(-2) + new Date().getFullYear() + ('0' + (new Date().getMonth() + 1)).slice(-2), [
    { subject: 'Accounts', firstCA: 85, secondCA: 90, thirdCA: 0, exam: 75 },
    { subject: 'Agricultural Scince', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Animal Husbandry', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Biology', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Catering & Craft', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Chemistry', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Civic', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Data Processing', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Economics', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'English Language', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Further Mathematics', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Food & Nutrition', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Geography', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Mathematics', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 },
    { subject: 'Physics', firstCA: 75, secondCA: 80, thirdCA: 0, exam: 85 }
]);

addStudentResult('Okechukw Nwaozor', 'ataoja' + ('0' + new Date().getDate()).slice(-2) + new Date().getFullYear() + ('0' + (new Date().getMonth() + 1)).slice(-2), [
    { subject: 'Accounts', firstCA: 10, secondCA: 10, thirdCA: 0, exam: 75 },
    { subject: 'Agricultural Scince', firstCA: 10, secondCA: 10, thirdCA: 0, exam: 85 },
    { subject: 'Animal Husbandry', firstCA: 10, secondCA: 10, thirdCA: 0, exam: 85 },
    { subject: 'Biology', firstCA: 10, secondCA: 10, thirdCA: 0, exam: 85 },
    { subject: 'Catering & Craft', firstCA: 10, secondCA: 10, thirdCA: 0, exam: 85 },
    { subject: 'Chemistry', firstCA: 10, secondCA: 10, thirdCA: 0, exam: 85 },
    { subject: 'Civic', firstCA: 10, secondCA: 10, thirdCA: 0, exam: 85 },
    { subject: 'Data Processing', firstCA: 10, secondCA: 10, thirdCA: 0, exam: 85 },
    { subject: 'Economics', firstCA: 10, secondCA: 10, thirdCA: 0, exam: 85 },
    { subject: 'English Language', firstCA: 10, secondCA: 10, thirdCA: 0, exam: 85 },
    { subject: 'Further Mathematics', firstCA: 10, secondCA: 10, thirdCA: 0, exam: 85 },
    { subject: 'Food & Nutrition', firstCA: 10, secondCA: 10, thirdCA: 0, exam: 85 },
    { subject: 'Geography', firstCA: 10, secondCA: 10, thirdCA: 0, exam: 85 },
    { subject: 'Mathematics', firstCA: 10, secondCA: 10, thirdCA: 0, exam: 85 },
    { subject: 'Physics', firstCA: 10, secondCA: 10, thirdCA: 0, exam: 85 }
]);

addStudentResult('Goodnews Nwaozor', 'ataoja' + ('0' + new Date().getDate()).slice(-2) + new Date().getFullYear() + ('0' + (new Date().getMonth() + 1)).slice(-2), [
    { subject: 'Accounts', firstCA: 10, secondCA: 10, thirdCA: 0, exam: 75 },
    { subject: 'Agricultural Scince', firstCA: 10, secondCA: 10, thirdCA: 0, exam: 85 },
    { subject: 'Animal Husbandry', firstCA: 10, secondCA: 10, thirdCA: 0, exam: 85 },
    { subject: 'Biology', firstCA: 10, secondCA: 10, thirdCA: 0, exam: 85 },
    { subject: 'Catering & Craft', firstCA: 10, secondCA: 10, thirdCA: 0, exam: 85 },
    { subject: 'Chemistry', firstCA: 10, secondCA: 10, thirdCA: 0, exam: 85 },
    { subject: 'Civic', firstCA: 10, secondCA: 10, thirdCA: 0, exam: 85 },
    { subject: 'Data Processing', firstCA: 10, secondCA: 10, thirdCA: 0, exam: 85 },
    { subject: 'Economics', firstCA: 10, secondCA: 10, thirdCA: 0, exam: 85 },
    { subject: 'English Language', firstCA: 10, secondCA: 10, thirdCA: 0, exam: 85 },
    { subject: 'Further Mathematics', firstCA: 10, secondCA: 10, thirdCA: 0, exam: 85 },
    { subject: 'Food & Nutrition', firstCA: 10, secondCA: 10, thirdCA: 0, exam: 85 },
    { subject: 'Geography', firstCA: 10, secondCA: 10, thirdCA: 0, exam: 85 },
    { subject: 'Mathematics', firstCA: 10, secondCA: 10, thirdCA: 0, exam: 85 },
    { subject: 'Physics', firstCA: 10, secondCA: 10, thirdCA: 0, exam: 85 }
]);
