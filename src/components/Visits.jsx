import React, { useState } from 'react';

const Visits = ({ 
  visits, 
  selectedPatient, 
  setSelectedPatient, 
  openModal, 
  deleteVisit 
}) => {
  
  const [searchQuery, setSearchQuery] = useState('');
  
  const patientVisits = selectedPatient 
    ? visits.filter(v => v.patient_id === selectedPatient.id)
    : visits;

  // Filter berdasarkan search query
  const filteredVisits = patientVisits.filter(visit => {
    const query = searchQuery.toLowerCase();
    return (
      visit.no_rm.toLowerCase().includes(query) ||
      visit.patient_name.toLowerCase().includes(query) ||
      visit.diagnosis.toLowerCase().includes(query) ||
      visit.keluhan.toLowerCase().includes(query) ||
      visit.tanggal.includes(query)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Rekam Medis</h2>
          {selectedPatient && (
            <div className="mt-2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
              <p className="text-sm text-gray-600">Pasien:</p>
              <p className="font-semibold text-gray-800">{selectedPatient.nama}</p>
              <p className="text-sm text-blue-600">{selectedPatient.no_rm} | NIK: {selectedPatient.nik}</p>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          {selectedPatient && (
            <button
              onClick={() => setSelectedPatient(null)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Lihat Semua
            </button>
          )}
          <button
            onClick={() => {
              if (selectedPatient) {
                openModal('addVisit');
              } else {
                alert('Pilih pasien terlebih dahulu dari menu Data Pasien');
              }
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-md hover:shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Tambah Kunjungan
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Cari berdasarkan No. RM, Nama Pasien, Diagnosis, Keluhan, atau Tanggal..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        {searchQuery && (
          <p className="mt-2 text-sm text-gray-600">
            Ditemukan {filteredVisits.length} hasil dari {patientVisits.length} kunjungan
          </p>
        )}
      </div>

      {/* Visits List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {filteredVisits.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-500 text-lg">
              {searchQuery 
                ? `Tidak ada hasil untuk "${searchQuery}"`
                : selectedPatient 
                  ? 'Pasien ini belum memiliki riwayat kunjungan' 
                  : 'Belum ada data kunjungan'
              }
            </p>
            {!selectedPatient && !searchQuery && (
              <p className="text-gray-400 text-sm mt-2">Pilih pasien dari menu Data Pasien untuk menambah kunjungan</p>
            )}
          </div>
        ) : (
          <div className="space-y-4 p-6">
            {filteredVisits.map((visit, index) => (
              <div 
                key={visit.id} 
                className="border-2 border-gray-200 rounded-lg p-5 hover:shadow-lg transition-all hover:border-blue-300"
              >
                {/* Visit Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                        Kunjungan #{filteredVisits.length - index}
                      </span>
                      <span className="text-gray-500 text-sm">{visit.tanggal}</span>
                    </div>
                    <h3 className="font-bold text-lg text-gray-800">{visit.patient_name}</h3>
                    <p className="text-sm text-gray-600">{visit.no_rm}</p>
                  </div>
                  <div className="flex gap-2">
                    {/* Edit Button */}
                    <button
                      onClick={() => openModal('editVisit', visit)}
                      className="text-green-600 hover:text-green-800 hover:bg-green-50 p-2 rounded-lg transition-all"
                      title="Edit Kunjungan"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    {/* Delete Button */}
                    <button
                      onClick={() => deleteVisit(visit.id)}
                      className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition-all"
                      title="Hapus Kunjungan"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Visit Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Keluhan */}
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <p className="font-semibold text-red-800">Keluhan:</p>
                    </div>
                    <p className="text-gray-800">{visit.keluhan}</p>
                  </div>

                  {/* Pemeriksaan */}
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                      <p className="font-semibold text-yellow-800">Pemeriksaan:</p>
                    </div>
                    <p className="text-gray-800">{visit.pemeriksaan}</p>
                  </div>

                  {/* Diagnosis */}
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="font-semibold text-purple-800">Diagnosis:</p>
                    </div>
                    <p className="text-gray-800">{visit.diagnosis}</p>
                  </div>

                  {/* Tindakan */}
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <p className="font-semibold text-blue-800">Tindakan:</p>
                    </div>
                    <p className="text-gray-800">{visit.tindakan}</p>
                  </div>

                  {/* Resep Obat */}
                  <div className="md:col-span-2 bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      <p className="font-semibold text-green-800">Resep Obat:</p>
                    </div>
                    <p className="text-gray-800 whitespace-pre-line">{visit.resep}</p>
                  </div>
                </div>

                {/* Timestamp */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    Dibuat: {new Date(visit.created_at).toLocaleString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Visit Count */}
      {filteredVisits.length > 0 && (
        <div className="text-sm text-gray-600 text-center">
          {selectedPatient 
            ? `Total ${filteredVisits.length} kunjungan untuk ${selectedPatient.nama}`
            : `Menampilkan ${filteredVisits.length} total kunjungan`
          }
        </div>
      )}
    </div>
  );
};

export default Visits;