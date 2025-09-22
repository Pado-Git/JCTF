import { Button, Modal, Switch } from "@/+shared/components";

interface EmailNotificationsModalProps {
  show: boolean;
  onClose: () => void;
}

function EmailNotificationsModal({ show, onClose }: EmailNotificationsModalProps) {
  return (
    <Modal
      show={show}
      onClose={onClose}
      title="Email Notifications"
      description="Manage your email notifications"
    >
      <div className="flex flex-col gap-6">
        <div className="flex justify-between gap-4">
          <div className="flex flex-col gap-2">
            <span className="typo-body-medium-bold">sdf</span>
            <span className="typo-body-xsmall text-neutral-200">df</span>
          </div>
          <Switch />
        </div>
      </div>
      <Button variant="primary" size="medium" className="" onClick={onClose}>Save Preferences</Button>
    </Modal>
  )
}

export default EmailNotificationsModal;