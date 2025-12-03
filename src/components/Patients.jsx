import React from 'react';

const Patients = ({ 
  patients, 
  searchTerm, 
  setSearchTerm, 
  openModal, 
  deletePatient, 
  setSelectedPatient, 
  setActiveMenu 
}) => {
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Data Pasien</h2>
        <button
          onClick={() => openModal('addPatient')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-md hover:shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          Tambah Pasien
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="relative">
          <svg className="w-5 h-5 absolute left-3 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Cari pasien (Nama, No. RM, NIK)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>
      </div>

      {/* Patients Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {patients.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-gray-500 text-lg">
              {searchTerm ? 'Tidak ada pasien yang ditemukan' : 'Belum ada data pasien'}
            </p>
            {searchTerm && (
              <p className="text-gray-400 text-sm mt-2">Coba kata kunci lain</p>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">No. RM</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">NIK</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Nama</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Jenis Kelamin</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Tanggal Lahir</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">No. HP</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient, index) => (
                  <tr 
                    key={patient.id} 
                    className={`border-b hover:bg-gray-50 transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <td className="py-3 px-4 font-medium text-blue-600">{patient.no_rm}</td>
                    <td className="py-3 px-4 text-gray-700">{patient.nik}</td>
                    <td className="py-3 px-4 font-medium text-gray-800">{patient.nama}</td>
                    <td className="py-3 px-4 text-gray-700">{patient.jenis_kelamin}</td>
                    <td className="py-3 px-4 text-gray-700">{patient.tanggal_lahir}</td>
                    <td className="py-3 px-4 text-gray-700">{patient.no_hp}</td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center gap-2">
                        {/* View Medical Records */}
                        <button
                          onClick={() => {
                            setSelectedPatient(patient);
                            setActiveMenu('visits');
                          }}
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-lg transition-all"
                          title="Lihat Rekam Medis"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        
                        {/* Edit */}
                        <button
                          onClick={() => openModal('editPatient', patient)}
                          className="text-green-600 hover:text-green-800 hover:bg-green-50 p-2 rounded-lg transition-all"
                          title="Edit"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        
                        {/* Delete */}
                        <button
                          onClick={() => deletePatient(patient.id)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition-all"
                          title="Hapus"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Patient Count */}
      {patients.length > 0 && (
        <div className="text-sm text-gray-600 text-center">
          Menampilkan {patients.length} pasien
          {searchTerm && ` dari pencarian "${searchTerm}"`}
        </div>
      )}
    </div>
  );
};

export default Patients;