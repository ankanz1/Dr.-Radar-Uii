import React, { useState } from 'react';
import { ScreenTab, UserAccountState } from '../types';
import { ClinicalDisclaimer } from './ClinicalDisclaimer';
import { ProfileAvatar } from './profile/ProfileAvatar';

interface PatientProfileScreenProps {
  onNavigate: (tab: ScreenTab) => void;
  onOpenSettings?: () => void;
  onOpenAccountSettings?: (tab?: 'profile' | 'account' | 'privacy' | 'security' | 'notifications') => void;
  onOpenProfilePictureModal?: () => void;
  onRemoveProfilePicture?: () => void;
  user?: UserAccountState;
}

export const PatientProfileScreen: React.FC<PatientProfileScreenProps> = ({
  onNavigate,
  onOpenSettings,
  onOpenAccountSettings,
  onOpenProfilePictureModal,
  onRemoveProfilePicture,
  user,
}) => {
  const [remindersOn, setRemindersOn] = useState(true);
  const [patchSynced, setPatchSynced] = useState(true);

  const displayName = user?.displayName || (user?.firstName ? `${user.firstName} ${user.lastName}` : 'Ashton Miller');

  const hasCustomPicture = user?.profilePictureType && user.profilePictureType !== 'none';

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#bc000a] bg-[#ffe8e8] px-2 py-0.5 rounded border border-[#bc000a]/25">
              DR. RADAR • PATIENT PROFILE
            </span>
            <span className="text-[11px] font-mono text-slate-500">ID #{user?.userId || 'PT-9042'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#101c28] tracking-tight">
            Medical Profile & Devices
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Personal health record, demographic information, telemetry hardware, and care team configuration.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          <button
            id="patient-profile-edit-settings-btn"
            onClick={() => {
              if (onOpenAccountSettings) {
                onOpenAccountSettings('profile');
              } else if (onOpenSettings) {
                onOpenSettings();
              }
            }}
            className="min-h-[44px] px-4 py-2.5 rounded-xl bg-[#bc000a] text-white text-xs font-bold hover:bg-[#a00008] transition-all shadow-2xs flex items-center gap-2 cursor-pointer active:scale-95"
            title="Edit personal profile and demographic info"
          >
            <span className="material-symbols-outlined text-[18px]">badge</span>
            <span>Profile Settings</span>
          </button>
          <button
            id="patient-profile-account-settings-btn"
            onClick={() => {
              if (onOpenAccountSettings) {
                onOpenAccountSettings('account');
              } else if (onOpenSettings) {
                onOpenSettings();
              }
            }}
            className="min-h-[44px] px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer active:scale-95"
            title="Security, passwords and preferences"
          >
            <span className="material-symbols-outlined text-[18px]">settings</span>
            <span className="hidden sm:inline">Account & Privacy</span>
            <span className="sm:hidden">Account</span>
          </button>
        </div>
      </div>

      {/* Patient Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 border-b border-slate-100 pb-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4.5">
            {/* Large Circular Avatar with online checkmark */}
            <div className="relative group cursor-pointer shrink-0" onClick={onOpenProfilePictureModal}>
              <ProfileAvatar
                user={user}
                size="2xl"
                borderStyle="brand"
                showIndicator
                indicatorColor="green"
                className="shadow-md ring-4 ring-[#bc000a]/10 group-hover:scale-105 transition-transform"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenProfilePictureModal?.();
                }}
                className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#bc000a] text-white flex items-center justify-center shadow-md hover:bg-[#a00008] transition-all cursor-pointer"
                title="Change Photo or Avatar"
              >
                <span className="material-symbols-outlined text-[15px]">photo_camera</span>
              </button>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black text-[#101c28]">{displayName}</h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#ffe8e8] text-[#bc000a] border border-[#bc000a]/20 font-bold uppercase tracking-wider">
                  {user?.role || 'Patient'}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                  Active Monitoring
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {user?.dob ? `Born: ${user.dob}` : '34 yrs'} • {user?.gender || 'Male'} • Blood Type O+ • Primary Indication: Preventive Rhythm Telemetry
              </p>

              {/* Photo & Avatar Controls */}
              <div className="flex items-center gap-2.5 mt-2.5 flex-wrap">
                <button
                  type="button"
                  id="profile-change-photo-btn"
                  onClick={onOpenProfilePictureModal}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <span className="material-symbols-outlined text-[15px] text-[#bc000a]">add_a_photo</span>
                  <span>Change Photo</span>
                </button>

                <button
                  type="button"
                  id="profile-choose-avatar-btn"
                  onClick={onOpenProfilePictureModal}
                  className="px-3 py-1.5 rounded-lg bg-[#ffe8e8]/60 hover:bg-[#ffe8e8] text-[#bc000a] text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 border border-[#bc000a]/20"
                >
                  <span className="material-symbols-outlined text-[15px]">face</span>
                  <span>Choose Avatar</span>
                </button>

                {hasCustomPicture && (
                  <button
                    type="button"
                    id="profile-remove-photo-btn"
                    onClick={onRemoveProfilePicture || onOpenProfilePictureModal}
                    className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 text-xs font-medium transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[14px]">delete</span>
                    <span>Remove Photo</span>
                  </button>
                )}

                <button
                  onClick={() => onOpenAccountSettings?.('profile')}
                  className="text-xs font-semibold text-slate-500 hover:text-[#bc000a] flex items-center gap-1 ml-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[15px]">edit</span>
                  <span>Edit Details</span>
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('patient-appointments')}
            className="min-h-[44px] px-4 py-2 rounded-xl bg-[#bc000a] text-white text-xs font-semibold hover:bg-[#a00008] transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer self-stretch sm:self-auto justify-center"
          >
            <span className="material-symbols-outlined text-[16px]">calendar_today</span>
            Book Consultation
          </button>
        </div>

        {/* Clinical Summary Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 block text-[11px]">Primary Cardiologist</span>
            <span className="font-bold text-[#101c28] mt-0.5 block">Dr. Ronald S.</span>
            <span className="text-[10px] text-slate-500">Metro Heart Inst.</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 block text-[11px]">Enrolled Protocol</span>
            <span className="font-bold text-[#101c28] mt-0.5 block">AAMI EC57 Baseline</span>
            <span className="text-[10px] text-slate-500">Continuous 1-Lead</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 block text-[11px]">Daily Resting Average</span>
            <span className="font-bold text-[#bc000a] mt-0.5 block">71 BPM</span>
            <span className="text-[10px] text-emerald-700">Healthy Conduction</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 block text-[11px]">Emergency Contact</span>
            <span className="font-bold text-[#101c28] mt-0.5 block">Claire Miller</span>
            <span className="text-[10px] text-slate-500">+1 (555) 019-2834</span>
          </div>
        </div>
      </div>

      {/* Connected Telemetry Hardware */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-[#101c28]">Connected Telemetry Device</h3>
            <p className="text-xs text-slate-500">Wireless biopotential sensor paired via BLE</p>
          </div>
          <span className="text-xs font-mono text-emerald-600 font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Connected
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#f8fbfe] border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-[#bc000a] shadow-2xs">
              <span className="material-symbols-outlined text-[24px]">sensors</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[#101c28]">Dr. Radar Bio-Patch #BP-841</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-medium">
                  Firmware v2.4.1
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Single-Lead ECG • 125 Hz Sampling Rate • 24-Bit ADC</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-xs font-bold text-slate-700 block">Battery 92%</span>
              <span className="text-[10px] text-slate-400">Est. 4 days remaining</span>
            </div>
            <button
              onClick={() => onNavigate('patient-ecg')}
              className="px-3.5 py-2 rounded-xl bg-[#bc000a] text-white text-xs font-semibold hover:bg-[#a00008] transition-all shadow-2xs"
            >
              Test Sensor
            </button>
          </div>
        </div>
      </div>

      {/* Routine & Preferences */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
        <h3 className="text-base font-bold text-[#101c28]">Routine & Reminders</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <div>
              <span className="font-bold text-xs text-[#101c28] block">Daily Morning ECG Reminder</span>
              <span className="text-[11px] text-slate-500">Receive a gentle prompt to take your 30-sec resting scan at 08:00 AM</span>
            </div>
            <button
              onClick={() => setRemindersOn(!remindersOn)}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                remindersOn ? 'bg-[#bc000a]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  remindersOn ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <div>
              <span className="font-bold text-xs text-[#101c28] block">Automatic Telemetry Sync</span>
              <span className="text-[11px] text-slate-500">Sync ECG strips directly with Dr. Ronald S.’s hospital clinical portal</span>
            </div>
            <button
              onClick={() => setPatchSynced(!patchSynced)}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                patchSynced ? 'bg-[#bc000a]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  patchSynced ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Profile & Security Management Row */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#fff8f8] border border-[#bc000a]/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#bc000a]/20 flex items-center justify-center text-[#bc000a] shrink-0">
                <span className="material-symbols-outlined text-[20px]">badge</span>
              </div>
              <div>
                <span className="font-bold text-xs text-[#101c28] block">Personal Profile & Privacy Controls</span>
                <span className="text-[11px] text-slate-500">Update demographic info, language, credentials, and HIPAA consent</span>
              </div>
            </div>
            <button
              id="patient-profile-manage-btn"
              onClick={() => onOpenAccountSettings?.('profile')}
              className="min-h-[40px] px-3.5 py-1.5 rounded-xl bg-white border border-[#bc000a]/30 text-xs font-bold text-[#bc000a] hover:bg-[#ffe8e8] transition-colors shadow-2xs shrink-0 cursor-pointer"
            >
              Manage Profile
            </button>
          </div>
        </div>
      </div>

      {/* Clinical Disclaimer */}
      <ClinicalDisclaimer />
    </div>
  );
};
