import React from 'react';

const Modal = ({ 
  showModal, 
  modalType, 
  formData, 
  setFormData, 
  selectedPatient, 
  handlePatientSubmit, 
  handleVisitSubmit, 
  closeModal 
}) => {
  
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">
          <h3 className="text-xl font-bold text-gray-800">
            {modalType === 'addPatient' && 'Tambah Pasien Baru'}
            {modalType === 'editPatient' && 'Edit Data Pasien'}
            {modalType === 'addVisit' && 'Tambah Kunjungan Baru'}
            {modalType === 'editVisit' && 'Edit Kunjungan'}
          </h3>
          <button 
            onClick={closeModal} 
            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* Patient Form */}
          {(modalType === 'addPatient' || modalType === 'editPatient') && (
            <form onSubmit={handlePatientSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    NIK <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    maxLength="16"
                    value={formData.nik || ''}
                    onChange={(e) => setFormData({...formData, nik: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Masukkan NIK 16 digit"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nama || ''}
                    onChange={(e) => setFormData({...formData, nama: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tanggal Lahir <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.tanggal_lahir || ''}
                    onChange={(e) => setFormData({...formData, tanggal_lahir: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Jenis Kelamin <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.jenis_kelamin || ''}
                    onChange={(e) => setFormData({...formData, jenis_kelamin: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  >
                    <option value="">Pilih Jenis Kelamin</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Golongan Darah
                  </label>
                  <select
                    value={formData.gol_darah || ''}
                    onChange={(e) => setFormData({...formData, gol_darah: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  >
                    <option value="">Pilih Golongan Darah</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="AB">AB</option>
                    <option value="O">O</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    No. HP <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.no_hp || ''}
                    onChange={(e) => setFormData({...formData, no_hp: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Contoh: 081234567890"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Alamat Lengkap <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows="3"
                    value={formData.alamat || ''}
                    onChange={(e) => setFormData({...formData, alamat: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Masukkan alamat lengkap"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                >
                  {modalType === 'addPatient' ? 'Simpan' : 'Update'}
                </button>
              </div>
            </form>
          )}

          {/* Visit Form */}
          {(modalType === 'addVisit' || modalType === 'editVisit') && (
            <form onSubmit={handleVisitSubmit} className="space-y-4">
              {/* Patient Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <p className="font-semibold text-gray-800">Informasi Pasien</p>
                </div>
                {modalType === 'addVisit' && selectedPatient && (
                  <>
                    <p className="text-lg font-bold text-gray-800">{selectedPatient.nama}</p>
                    <div className="flex gap-4 mt-1 text-sm text-gray-600">
                      <span>No. RM: <span className="font-medium text-blue-600">{selectedPatient.no_rm}</span></span>
                      <span>NIK: <span className="font-medium">{selectedPatient.nik}</span></span>
                    </div>
                  </>
                )}
                {modalType === 'editVisit' && (
                  <>
                    <p className="text-lg font-bold text-gray-800">{formData.patient_name}</p>
                    <p className="text-sm text-blue-600">No. RM: {formData.no_rm}</p>
                  </>
                )}
              </div>

              {/* Tanggal Kunjungan */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tanggal Kunjungan <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.tanggal || new Date().toISOString().split('T')[0]}
                  onChange={(e) => setFormData({...formData, tanggal: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Keluhan */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Keluhan <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows="3"
                  value={formData.keluhan || ''}
                  onChange={(e) => setFormData({...formData, keluhan: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Contoh: Demam tinggi sejak 3 hari yang lalu, disertai batuk dan pilek"
                />
              </div>

              {/* Pemeriksaan */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hasil Pemeriksaan <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows="3"
                  value={formData.pemeriksaan || ''}
                  onChange={(e) => setFormData({...formData, pemeriksaan: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Contoh: TD: 120/80 mmHg, Suhu: 38.5°C, Nadi: 88x/menit, Pernapasan: 20x/menit"
                />
              </div>

              {/* Diagnosis */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Diagnosis <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows="2"
                  value={formData.diagnosis || ''}
                  onChange={(e) => setFormData({...formData, diagnosis: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Contoh: ISPA (Infeksi Saluran Pernapasan Atas)"
                />
              </div>

              {/* Tindakan */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tindakan <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows="2"
                  value={formData.tindakan || ''}
                  onChange={(e) => setFormData({...formData, tindakan: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Contoh: Pemberian obat antipiretik dan antibiotik, istirahat yang cukup"
                />
              </div>

              {/* Resep Obat */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Resep Obat <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows="4"
                  value={formData.resep || ''}
                  onChange={(e) => setFormData({...formData, resep: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Contoh:&#10;1. Paracetamol 500mg - 3x1 tablet/hari (sesudah makan)&#10;2. Amoxicillin 500mg - 3x1 kapsul/hari (sesudah makan)&#10;3. Obat batuk sirup - 3x1 sendok makan/hari"
                />
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-2 pt-4 border-t">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                >
                  {modalType === 'addVisit' ? 'Simpan Kunjungan' : 'Update Kunjungan'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;