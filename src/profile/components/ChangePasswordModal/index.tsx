import { FormField, Modal } from "@/+shared/components";
import { Button } from "@/+shared/components";
import { useState } from "react";

interface ChangePasswordModalProps {
  show: boolean;
  onClose: () => void;
}

export function ChangePasswordModal({ show, onClose }: ChangePasswordModalProps) {

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    
    <Modal
      show={show}
      onClose={onClose}
      title="Change Password"
      description="Update your login credentials"
    >
      <div className="flex flex-col gap-6">
        <FormField
          label="Current Password"
          placeholder="Enter your current password"
          id="current-password"
          type="password"
          value={currentPassword}
          onChange={setCurrentPassword}
        />
        <FormField
          label="New Password"
          placeholder="Enter your new password"
          id="new-password"
          type="password"
          value={newPassword}
          onChange={setNewPassword}
        />
        <FormField
          label="Confirm Password"
          placeholder="Confirm your new password"
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
        />
        <div className="flex flex-1 gap-4 justify-end">
          <Button variant="secondary-gray" size="medium" className="w-full" onClick={onClose}>Cancel</Button>
          <Button variant="primary" size="medium" className="w-full">Update Password</Button>
        </div>
      </div>
    </Modal>
  )
}

export default ChangePasswordModal;