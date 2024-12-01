import { useEffect, useState } from "react";
import updateProfile from "../../functions/api/updateProfile";
import { useParams } from "react-router-dom";

interface Avatar {
  url: string;
  alt: string;
}

interface Profile {
  bio: string;
  venueManager: boolean;
  avatar: Avatar;
}

interface SettingsModalProps {
  /**
   * Determines if the modal is open or closed.
   * @type {boolean}
   */
  isOpen: boolean;

  /**
   * Function to close the modal.
   * @returns {void}
   */
  onClose: () => void;

  /**
   * Profile data of the user.
   * @type {Profile | null}
   */
  profile: Profile | null;
}

/**
 * A modal component for editing user account settings.
 * 
 * This component allows users to update their bio, avatar URL, and venue manager status.
 * It provides a modal interface for making changes, and once changes are saved, it updates
 * the profile by calling the `updateProfile` function.
 * 
 * @param {SettingsModalProps} props - The settings modal props.
 * @returns {JSX.Element} The modal UI to update account settings.
 */
const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, profile }) => {
  const [settings, setSettings] = useState<Profile>({
    bio: "",
    venueManager: false,
    avatar: { url: "", alt: "" },
  });

  const { username } = useParams();

  /**
   * Sets the settings state when the profile prop changes.
   * 
   * This effect ensures that when the profile is provided or updated, the modal will
   * display the current settings data.
   * 
   * @returns {void}
   */
  useEffect(() => {
    if (profile) {
      setSettings(profile);
    }
  }, [profile]);

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 ${isOpen ? "block" : "hidden"}`}
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg max-w-sm mx-auto mt-20"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <input
              type="text"
              id="bio"
              value={settings.bio || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  bio: e.target.value,
                })
              }
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label htmlFor="avatarUrl" className="block text-sm font-medium text-gray-700">
              Avatar URL
            </label>
            <input
              type="text"
              id="avatarUrl"
              value={settings.avatar.url || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  avatar: {
                    ...settings.avatar,
                    url: e.target.value,
                  },
                })
              }
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label htmlFor="venueManager" className="block text-sm font-medium text-gray-700">
              Venue Manager
            </label>
            <input
              type="checkbox"
              id="venueManager"
              checked={settings.venueManager}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  venueManager: e.target.checked,
                })
              }
              className="mt-2"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              if (username && settings) {
                await updateProfile(username, settings);
                onClose();
                window.location.reload();
              }
            }}
            className="px-4 py-2 bg-customOrange text-white rounded hover:bg-orange-600"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
