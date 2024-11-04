function showSection(sectionId) {
    const sections = document.querySelectorAll('main section');
    sections.forEach(section => {
        section.classList.remove('active');
        if (section.id === sectionId) {
            section.classList.add('active');
            if (sectionId === 'attendance-record') {
                loadAttendance();
            }
        }
    });
}

document.getElementById('attendanceForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const studentName = document.getElementById('studentName').value;
    const batchNumber = document.getElementById('batchNumber').value;
    const date = document.getElementById('date').value;
    const status = document.getElementById('status').value;

    const attendanceData = { studentName, batchNumber, date, status };
    saveAttendance(attendanceData);
    this.reset();
});

function saveAttendance(data) {
    const attendanceList = JSON.parse(localStorage.getItem('attendanceList')) || [];
    attendanceList.push(data);
    localStorage.setItem('attendanceList', JSON.stringify(attendanceList));
    alert('Attendance marked successfully!');
}

function loadAttendance() {
    const recordList = document.getElementById('recordList');
    recordList.innerHTML = '';
    const attendanceList = JSON.parse(localStorage.getItem('attendanceList')) || [];
    attendanceList.forEach((record) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${record.date} - ${record.studentName} (Batch: ${record.batchNumber}): ${record.status}`;
        recordList.appendChild(listItem);
    });
}

function clearAttendance() {
    localStorage.removeItem('attendanceList');
    alert('All attendance records cleared!');
    loadAttendance();
}

// Show the home section by default
showSection('home');
