const gpaScale = {
    'A+': { min: 97, max: 100, points: 4.0 },
    'A': { min: 93, max: 96, points: 4.0 },
    'A-': { min: 90, max: 92, points: 3.7 },
    'B+': { min: 87, max: 89, points: 3.3 },
    'B': { min: 83, max: 86, points: 3.0 },
    'B-': { min: 80, max: 82, points: 2.7 },
    'C+': { min: 77, max: 79, points: 2.3 },
    'C': { min: 73, max: 76, points: 2.0 },
    'C-': { min: 70, max: 72, points: 1.7 },
    'D+': { min: 67, max: 69, points: 1.3 },
    'D': { min: 65, max: 66, points: 1.0 },
    'F': { min: 0, max: 64, points: 0.0 }
};

function calculateGPA() {
    const subjects = ['math', 'physics', 'chinese', 'history', 'englishLit', 'englishLang', 'firstElective', 'secondElective'];

    let totalGPA = 0;
    let totalPercentage = 0;
    let validSubjectCount = 0;

    subjects.forEach(subject => {
        const grade = getGrade(subject, gpaScale);
        if (grade.points !== undefined) {
            totalGPA += grade.points;
            totalPercentage += grade.percentage;
            validSubjectCount++;
        }
    });

    if (validSubjectCount === 0) {
        alert("Please enter valid percentages for at least one subject.");
        return;
    }

    const averageGPA = totalGPA / validSubjectCount;
    const averagePercentage = totalPercentage / validSubjectCount;

    displayResults(averageGPA, averagePercentage);
}

function getGrade(subject, gpaScale) {
    const percentage = parseFloat(document.getElementById(subject).value);
    
    for (const grade in gpaScale) {
        const range = gpaScale[grade];
        if (percentage >= range.min && percentage <= range.max) {
            return { points: range.points, percentage: percentage };
        }
    }

    // Default to 0 points if no match is found
    return { points: undefined, percentage: percentage };
}

function displayResults(averageGPA, averagePercentage) {
    const averageGPAElement = document.getElementById('averageGPA');
    const percentageAverageElement = document.getElementById('percentageAverage');
    const recommendationElement = document.getElementById('recommendation');

    averageGPAElement.textContent = averageGPA.toFixed(2);
    percentageAverageElement.textContent = averagePercentage.toFixed(2) + "%";

    // Add logic to recommend improvement based on lowest subject
    const lowestSubject = findLowestSubject();
    recommendationElement.textContent = `Improve in ${lowestSubject}`;
}

function findLowestSubject() {
    const subjects = ['math', 'physics', 'chinese', 'history', 'englishLit', 'englishLang', 'firstElective', 'secondElective'];
    let lowestSubject = subjects[0];
    let lowestPercentage = parseFloat(document.getElementById(subjects[0]).value);

    subjects.forEach(subject => {
        const percentage = parseFloat(document.getElementById(subject).value);
        if (percentage < lowestPercentage) {
            lowestPercentage = percentage;
            lowestSubject = subject;
        }
    });

    return lowestSubject;
}
