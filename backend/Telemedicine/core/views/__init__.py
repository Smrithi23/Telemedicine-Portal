# Common
# - auth
from .Common.Auth import PatientAuth, DoctorAuth

# Doctor
# - Register
from .Doctor.Register import doctor_register
# - Login
from .Doctor.Login import doctor_login
# - Dashboard
from .Doctor.Dashboard import DoctorDashboard
# - Profile
from .Doctor.Profile import DoctorViewProfile, UpdateDoctorProfile, UpdateDoctorProfilePic, UpdateDoctorPassword
# - MedicalRecord
from .Doctor.MedicalRecord import CreateMedicalRecord, ViewMedicalRecordById, ViewMedicalRecords

from .Doctor.AttendPatient import AttendPatient
from .Doctor.PatientDetails import PatientDetails

# Patient
# - Register
from .Patient.Register import patient_register
# - Login
from .Patient.Login import patient_login
# - Dashboard
from .Patient.Dashboard import PatientDashboard
# - Profile
from .Patient.Profile import PatientViewProfile, UpdatePatientProfile, UpdatePatientProfilePic, UpdatePatientPassword

# - Appointment
from .Patient.Appointment import BookAppointment, PatientBookAppointmentList, PatientViewBookAppointmentForm
# - Medical Record
from .Patient.MedicalRecord import PatientViewAllMedicalRecords, PatientViewMedicalRecordsByDoctorId, PatientViewMedicalRecordById
# - Feedback
from .Patient.Feedback import CreateFeedback
