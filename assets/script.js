let headers = [];
let selectedHeaders = [];

function detectHeaders() {
    const textarea = document.getElementById('dataInput');
    const data = textarea.value.trim();

    // Split data into lines
    const lines = data.split('\n');
    
    if (lines.length > 0) {
        // Get headers from the first line
        headers = lines[0].split('\t'); // Assuming tab-separated values

        // Display headers with checkboxes
        const checkboxContainer = document.getElementById('checkboxContainer');
        checkboxContainer.innerHTML = ''; // Clear previous checkboxes
        headers.forEach((header, index) => {
            const checkboxDiv = document.createElement('div');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `headerCheckbox${index}`;
            checkbox.value = index;
            checkboxDiv.appendChild(checkbox);
            const label = document.createElement('label');
            label.htmlFor = `headerCheckbox${index}`;
            label.textContent = header;
            checkboxDiv.appendChild(label);
            checkboxContainer.appendChild(checkboxDiv);
        });
    } else {
        alert('Veuillez coller les données dans la zone de texte.');
    }
}

function createNewTable() {
    const checkboxes = document.querySelectorAll('#checkboxContainer input[type="checkbox"]');
    selectedHeaders = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedHeaders.push(parseInt(checkbox.value));
        }
    });

    if (selectedHeaders.length === 0) {
        alert('Veuillez sélectionner au moins un en-tête.');
        return;
    }

    const textarea = document.getElementById('dataInput');
    const data = textarea.value.trim();

    // Split data into lines
    const lines = data.split('\n');
    const newTableData = [];

    // Create new table with selected headers
    lines.forEach(line => {
        const cells = line.split('\t');
        const newLine = selectedHeaders.map(index => cells[index]);
        newTableData.push(newLine.join('\t'));
    });

    // Display new table
    const newTableOutput = document.getElementById('newTableOutput');
    newTableOutput.innerHTML = '<h3>Nouvelle table :</h3>';
    newTableOutput.innerHTML += '<pre>' + newTableData.join('\n') + '</pre>';
}
