import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Badge } from '@/+shared/components';
import { Key, Bell, Eye } from 'lucide-react';

interface AccountSettingsProps {
  onNavigate?: (path: string) => void;
}

export function AccountSettings({ onNavigate }: AccountSettingsProps) {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-warning/30">
      <CardHeader>
        <CardTitle className="text-foreground">Account Settings</CardTitle>
        <CardDescription className="text-muted-foreground">
          Manage your account preferences and security
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border">
          <div className="flex items-center space-x-3">
            <Key className="h-5 w-5 text-warning" />
            <div>
              <h4 className="font-semibold text-foreground">Change Password</h4>
              <p className="text-sm text-muted-foreground">Update your login credentials</p>
            </div>
          </div>
          <Button variant="secondary" className="border-warning text-warning hover:bg-warning hover:text-warning-foreground">
            Change
          </Button>
        </div>
        
        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border">
          <div className="flex items-center space-x-3">
            <Bell className="h-5 w-5 text-primary" />
            <div>
              <h4 className="font-semibold text-foreground">Email Notifications</h4>
              <p className="text-sm text-muted-foreground">Competition updates and announcements</p>
            </div>
          </div>
          <Button variant="secondary" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            Configure
          </Button>
        </div>
        
        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border">
          <div className="flex items-center space-x-3">
            <Eye className="h-5 w-5 text-accent" />
            <div>
              <h4 className="font-semibold text-foreground">Profile Visibility</h4>
              <p className="text-sm text-muted-foreground">Control who can see your profile</p>
            </div>
          </div>
          <Badge variant="primary" className="border-accent text-accent">
            Public
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

export default AccountSettings;
