import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Patients from './components/Patients';
import Visits from './components/Visits';
import Modal from './components/Modal';

const App = () => {
  // LOGIN STATE
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [patients, setPatients] = useState([]);
  const [visits, setVisits] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [formData, setFormData] = useState({});

  // Load data from localStorage
  useEffect(() => {
    const savedPatients = localStorage.getItem('patients');
    const savedVisits = localStorage.getItem('visits');
    if (savedPatients) setPatients(JSON.parse(savedPatients));
    if (savedVisits) setVisits(JSON.parse(savedVisits));
  }, []);

  // Auto save
  useEffect(() => {
    localStorage.setItem('patients', JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    localStorage.setItem('visits', JSON.stringify(visits));
  }, [visits]);

  const generateNoRM = () => {
    const year = new Date().getFullYear();
    const number = (patients.length + 1).toString().padStart(4, '0');
    return `RM${year}${number}`;
  };

  const handlePatientSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      setPatients(patients.map(p => p.id === formData.id ? formData : p));
    } else {
      const newPatient = {
        ...formData,
        id: Date.now(),
        no_rm: generateNoRM(),
        created_at: new Date().toISOString()
      };
      setPatients([...patients, newPatient]);
    }
    closeModal();
  };

  const handleVisitSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      const updatedVisit = {
        ...formData,
        patient_id: formData.patient_id,
        patient_name: formData.patient_name,
        no_rm: formData.no_rm,
        created_at: formData.created_at
      };
      setVisits(visits.map(v => v.id === formData.id ? updatedVisit : v));
    } else {
      const newVisit = {
        ...formData,
        id: Date.now(),
        patient_id: selectedPatient.id,
        patient_name: selectedPatient.nama,
        no_rm: selectedPatient.no_rm,
        created_at: new Date().toISOString()
      };
      setVisits([...visits, newVisit]);
    }
    closeModal();
  };

  const deletePatient = (id) => {
    if (confirm('Yakin ingin menghapus data pasien ini?')) {
      setPatients(patients.filter(p => p.id !== id));
      setVisits(visits.filter(v => v.patient_id !== id));
    }
  };

  const deleteVisit = (id) => {
    if (confirm('Yakin ingin menghapus data kunjungan ini?')) {
      setVisits(visits.filter(v => v.id !== id));
    }
  };

  const openModal = (type, data = {}) => {
    setModalType(type);
    setFormData(data);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({});
    if (modalType !== 'addVisit' && modalType !== 'editVisit') {
      setSelectedPatient(null);
    }
  };

  const filteredPatients = patients.filter(p =>
    p.nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.no_rm?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.nik?.includes(searchTerm)
  );

  // LOGIN CHECK (tidak mengubah logic lain)
  if (!isLoggedIn) {
    return (
      <Login
        onLogin={(user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-pink-50">

      {/* HEADER - PINK, menampilkan nama user */}
      <header className="bg-gradient-to-r from-pink-600 to-pink-700 text-white shadow-lg">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Sistem Rekam Medis Klinik</h1>
            <p className="text-pink-100 mt-1">Manajemen Data Pasien & Rekam Medis</p>
          </div>

          <div className="flex items-center gap-4">
            {/* tampilkan nama user — kalau null, tampil "Admin" (tidak mengubah logic) */}
            <div className="text-right">
              <p className="font-semibold">{currentUser?.name ?? 'Admin'}</p>
              <p className="text-sm text-pink-100">{currentUser?.role ?? 'admin'}</p>
            </div>

            <button
              onClick={() => {
                setIsLoggedIn(false);
                setCurrentUser(null);
              }}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* NAVIGATION - PINK STYLES */}
      <nav className="bg-pink-100/60 shadow">
        <div className="container mx-auto px-4">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveMenu('dashboard')}
              className={`px-6 py-4 font-semibold transition-all flex items-center gap-2 ${
                activeMenu === 'dashboard'
                  ? 'text-pink-700 border-b-2 border-pink-700 bg-pink-50'
                  : 'text-pink-600 hover:text-pink-800'
              }`}
            >
              Dashboard
            </button>

            <button
              onClick={() => {
                setActiveMenu('patients');
                setSelectedPatient(null);
              }}
              className={`px-6 py-4 font-semibold transition-all flex items-center gap-2 ${
                activeMenu === 'patients'
                  ? 'text-pink-700 border-b-2 border-pink-700 bg-pink-50'
                  : 'text-pink-600 hover:text-pink-800'
              }`}
            >
              Data Pasien
            </button>

            <button
              onClick={() => setActiveMenu('visits')}
              className={`px-6 py-4 font-semibold transition-all flex items-center gap-2 ${
                activeMenu === 'visits'
                  ? 'text-pink-700 border-b-2 border-pink-700 bg-pink-50'
                  : 'text-pink-600 hover:text-pink-800'
              }`}
            >
              Rekam Medis
            </button>
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <main className="container mx-auto px-4 py-8">
        {activeMenu === 'dashboard' && <Dashboard patients={patients} visits={visits} />}

        {activeMenu === 'patients' && (
          <Patients
            patients={filteredPatients}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            openModal={openModal}
            deletePatient={deletePatient}
            setSelectedPatient={setSelectedPatient}
            setActiveMenu={setActiveMenu}
          />
        )}

        {activeMenu === 'visits' && (
          <Visits
            visits={visits}
            selectedPatient={selectedPatient}
            setSelectedPatient={setSelectedPatient}
            openModal={openModal}
            deleteVisit={deleteVisit}
          />
        )}
      </main>

      {/* MODAL */}
      <Modal
        showModal={showModal}
        modalType={modalType}
        formData={formData}
        setFormData={setFormData}
        selectedPatient={selectedPatient}
        handlePatientSubmit={handlePatientSubmit}
        handleVisitSubmit={handleVisitSubmit}
        closeModal={closeModal}
      />
    </div>
  );
};

export default App;
