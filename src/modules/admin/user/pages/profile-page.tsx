import React, { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function ProfilePage(): JSX.Element {
  const [displayName, setDisplayName] = useState("Larry Lathe")
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handlePersonalInfoSubmit = () => {
    // Implementar la lógica para guardar la información personal
    console.log("Saving personal info:", { displayName, profileImage })
  }

  const handlePasswordSubmit = () => {
    // Implementar la lógica para actualizar la contraseña
    console.log("Updating password:", {
      currentPassword,
      newPassword,
      confirmPassword
    })
  }

  const handleDeleteAccount = () => {
    // Implementar la lógica para eliminar la cuenta
    console.log("Deleting account")
  }

  return (
    <div className="p-6 mx-auto">
      
      <h2 className="text-xl font-bold mb-6">Profile</h2>
      
      {/* Personal Info Section */}
      <div className="mb-8">
        <div className="flex">
          <div className="w-1/3 pr-6">
            <h3 className="font-medium mb-1">Personal info</h3>
            <p className="text-sm text-gray-500">Update your photo and personal details.</p>
          </div>
          
          <div className="w-2/3 border rounded-md p-6">
            <div className="mb-4">
              <label className="block mb-1 text-sm">Display name</label>
              <Input 
                type="text" 
                value={displayName} 
                onChange={(e) => setDisplayName(e.target.value)} 
                className="w-full"
              />
            </div>
            
            <div className="mb-6">
              <div 
                onClick={handleImageClick}
                className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer overflow-hidden mb-2"
              >
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  className="hidden" 
                  accept="image/*" 
                />
              </div>
              <p className="text-xs text-gray-500">
                Click to upload or drag and drop<br />
                SVG, PNG, JPG or GIF (max. 800x800px)
              </p>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handlePersonalInfoSubmit}>Save changes</Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Password Section */}
      <div className="mb-8  pt-8">
        <div className="flex">
          <div className="w-1/3 pr-6">
            <h3 className="font-medium mb-1">Password</h3>
            <p className="text-sm text-gray-500">Please enter your current password to change your password</p>
          </div>
          
          <div className="w-2/3 border rounded-md p-6">
            <div className="space-y-4 mb-4">
              <div>
                <label className="block mb-1 text-sm">Current password</label>
                <Input 
                  type="password" 
                  value={currentPassword} 
                  onChange={(e) => setCurrentPassword(e.target.value)} 
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block mb-1 text-sm">New password</label>
                <Input 
                  type="password" 
                  value={newPassword} 
                  onChange={(e) => setNewPassword(e.target.value)} 
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
              </div>
              
              <div>
                <label className="block mb-1 text-sm">Confirm new password</label>
                <Input 
                  type="password" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  className="w-full"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handlePasswordSubmit}>Update password</Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Delete Account Section */}
      <div className="mb-8  pt-8">
        <div className="flex">
          <div className="w-1/3 pr-6">
            <h3 className="font-medium mb-1">Delete account</h3>
            <p className="text-sm text-gray-500">Permanently remove your account and all associated data</p>
          </div>
          
          <div className="w-2/3 border rounded-md p-6">
            <p className="text-sm text-gray-600 mb-6">
              By deleting your data, all personal information and stored data will be permanently removed from 
              our system. This action is irreversible and your account, preferences, and any linked services will 
              be fully disconnected and deleted.
            </p>
            
            <div>
              <Button 
                variant="outline" 
                className="text-red-600 border-red-600 hover:bg-red-50"
                onClick={handleDeleteAccount}
              >
                Delete account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage 