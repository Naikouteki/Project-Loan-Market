const bankData = [
    { name: 'Bank A', percentage: 78 },
    { name: 'Bank B', percentage: 65 },
    { name: 'Bank C', percentage: 92 },
    { name: 'Bank D', percentage: 85 },
  ];
  
  const tableBody = document.getElementById('bank-table');
  
  bankData.forEach(bank => {
    const tableRow = document.createElement('tr');
  
    // Nama Bank
    const nameCell = document.createElement('td');
    nameCell.textContent = bank.name;
  
    // Persentase
    const percentageCell = document.createElement('td');
    percentageCell.textContent = `${bank.percentage}%`;
  
    // Diagram Lingkaran
    const diagramCell = document.createElement('td');
    diagramCell.innerHTML = `
      <div class="circle-container">
        <svg class="circle-svg">
          <circle class="circle-bg" cx="30" cy="30" r="25"></circle>
          <circle class="circle-progress" cx="30" cy="30" r="25" style="stroke-dashoffset: ${283 - (283 * bank.percentage) / 100};"></circle>
        </svg>
        <div class="progress-value">${bank.percentage}%</div>
      </div>
    `;
  
    // Tambahkan sel ke baris
    tableRow.appendChild(nameCell);
    tableRow.appendChild(percentageCell);
    tableRow.appendChild(diagramCell);
  
    // Tambahkan baris ke tabel
    tableBody.appendChild(tableRow);
  });
  

  document.querySelector('.update-button').addEventListener('click', function (event) {
    // Ambil semua input teks, select, dan checkbox di dalam container
    const container = document.querySelector('.container');
    const textInputs = container.querySelectorAll('input[type="text"]');
    const selects = container.querySelectorAll('select');
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');

    let allFilled = true;

    // Validasi untuk input teks
    textInputs.forEach(input => {
        if (input.value.trim() === '') {
            input.classList.add('error'); // Tambahkan class error
            allFilled = false;
        } else {
            input.classList.remove('error'); // Hapus class error
        }
    });

    // Validasi untuk dropdown (select)
    selects.forEach(select => {
        if (select.value === '--Pilih Provinsi--' || select.value === '--Pilih Kabupaten / Kota--' || select.value === '--Pilih Kecamatan--' || select.value === '--Pilih Kelurahan--') {
            select.classList.add('error'); // Tambahkan class error
            allFilled = false;
        } else {
            select.classList.remove('error'); // Hapus class error
        }
    });

    // Validasi untuk checkbox (jika checkbox perlu diceklis)
    checkboxes.forEach(checkbox => {
        const label = checkbox.nextElementSibling; // Ambil label terkait
        if (!checkbox.checked && checkbox.id === 'domisili-sesuai-ktp') {
            label.classList.add('error'); // Tambahkan class error
            allFilled = false;
        } else {
            label.classList.remove('error'); // Hapus class error
        }
    });

    // Jika ada field yang kosong, hentikan proses update
    if (!allFilled) {
        event.preventDefault(); // Mencegah aksi default tombol UPDATE
        alert('Harap isi semua field yang kosong!');
    } else {
        alert('Semua data sudah lengkap. Data berhasil diperbarui!');
    }
});

// Tambahkan event listener untuk menghapus error class saat user mengetik/memilih
document.querySelectorAll('.container input, .container select').forEach(element => {
    element.addEventListener('input', function () {
        if (element.value.trim() !== '') {
            element.classList.remove('error'); // Hapus error
        }
    });

    element.addEventListener('change', function () {
        if (element.value !== '--Pilih Provinsi--' && element.value !== '--Pilih Kabupaten / Kota--' && element.value !== '--Pilih Kecamatan--' && element.value !== '--Pilih Kelurahan--') {
            element.classList.remove('error'); // Hapus error
        }
    });
});
