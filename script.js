function calculateGPA() {
    const subjects = ['math', 'physics', 'chinese', 'history', 'englishLit', 'englishLang', 'firstElective', 'secondElective'];

    let totalGPA = 0;
    let totalPercentage = 0;

    subjects.forEach(subject => {
        const grade = getGrade(subject, gpaScale);
        totalGPA += grade.points;
        totalPercentage += grade.percentage;
    });

    const validSubjects = subjects.filter(subject => {
        return subject !== 'secondElective' || parseFloat(document.getElementById('secondElective').value) !== 0;
    });

    const averageGPA = totalGPA / validSubjects.length;
    const averagePercentage = totalPercentage / validSubjects.length;

    displayResults(averageGPA, averagePercentage);
}

// Rest of the code remains the same

