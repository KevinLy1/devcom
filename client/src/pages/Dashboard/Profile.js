import { Link } from 'react-router-dom';
import { FaUser, FaFile } from 'react-icons/fa';
import { useState } from 'react';
import useProfile from '../../hooks/useProfile';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import moment from 'moment';
import 'moment/locale/fr';
import { Button, Drawer } from '@material-tailwind/react';
import { FaLock, FaPen, FaTrash } from 'react-icons/fa';
import { apiDeleteUser, apiUpdateUser } from '../../api/users';
import { apiDeleteImage } from '../../api/images';
import { notification } from 'antd';
import useAuth from '../../contexts/AuthContext';
import ChangePasswordForm from '../../components/Forms/ChangePasswordForm';
import ChangeUserDataForm from '../../components/Forms/ChangeUserDataForm';
import ChangeAvatarForm from '../../components/Forms/ChangeAvatarForm';
import validator from 'validator';

const ProfilePage = () => {
  const user = useProfile();
  const { logout } = useAuth();

  useDocumentTitle(`Profil (${user.username})`);

  const [openChangeAvatarForm, setOpenChangeAvatarForm] = useState(false);
  const openChangeAvatarFormDrawer = () => setOpenChangeAvatarForm(true);
  const closeChangeAvatarFormDrawer = () => setOpenChangeAvatarForm(false);

  const [openChangePasswordForm, setOpenChangePasswordForm] = useState(false);
  const openChangePasswordFormDrawer = () => setOpenChangePasswordForm(true);
  const closeChangePasswordFormDrawer = () => setOpenChangePasswordForm(false);

  const [openEmailForm, setOpenEmailForm] = useState(false);
  const openEmailFormDrawer = () => setOpenEmailForm(true);
  const closeEmailFormDrawer = () => setOpenEmailForm(false);

  const [openFirstNameForm, setOpenFirstNameForm] = useState(false);
  const openFirstNameFormDrawer = () => setOpenFirstNameForm(true);
  const closeFirstNameFormDrawer = () => setOpenFirstNameForm(false);

  const [openLastNameForm, setOpenLastNameForm] = useState(false);
  const openLastNameFormDrawer = () => setOpenLastNameForm(true);
  const closeLastNameFormDrawer = () => setOpenLastNameForm(false);

  const [openGenderForm, setOpenGenderForm] = useState(false);
  const openGenderFormDrawer = () => setOpenGenderForm(true);
  const closeGenderFormDrawer = () => setOpenGenderForm(false);

  const [openWebUrlForm, setOpenWebUrlForm] = useState(false);
  const openWebUrlFormDrawer = () => setOpenWebUrlForm(true);
  const closeWebUrlFormDrawer = () => setOpenWebUrlForm(false);

  const [openBiographyForm, setOpenBiographyForm] = useState(false);
  const openBiographyFormDrawer = () => setOpenBiographyForm(true);
  const closeBiographyFormDrawer = () => setOpenBiographyForm(false);

  const [openSkillsForm, setOpenSkillsForm] = useState(false);
  const openSkillsFormDrawer = () => setOpenSkillsForm(true);
  const closeSkillsFormDrawer = () => setOpenSkillsForm(false);

  const handleDelete = async (e) => {
    e.preventDefault();

    const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer votre compte ?');

    if (confirmation) {
      try {
        const response = await apiDeleteUser(user.id_user);
        if (response.ok) {
          notification.success({
            message: 'Votre compte a bien été supprimé'
          });
          await logout();
        }
      } catch {
        //
      }
    }
  };

  const handleDeleteAvatar = async (e) => {
    e.preventDefault();

    const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer votre avatar actuel ?');

    if (confirmation) {
      try {
        const response = await apiDeleteImage(user.avatar);
        if (response.ok) {
          await apiUpdateUser(user.id_user, {
            avatar: null
          });
          notification.success({
            message: 'Votre avatar a bien été supprimé'
          });

          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      } catch {
        //
      }
    }
  };

  if (user) {
    return (
      <>
        <h2 className="text-4xl text-center mb-10 font-bold">
          Votre profil ({user.username ? validator.unescape(user.username) : ''})
        </h2>
        <div className="flex items-center flex-wrap justify-center gap-3 mb-10">
          <Button color="blue" onClick={openChangePasswordFormDrawer}>
            <div className="flex items-center gap-2">
              <FaLock /> Modifier le mot de passe
            </div>
          </Button>
          <Button color="red" onClick={handleDelete}>
            <div className="flex items-center gap-2">
              <FaTrash /> Supprimer le compte
            </div>
          </Button>
        </div>
        <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-4">
          <div className="md:col-span-1 relative">
            <img
              src={
                user.avatar
                  ? `${process.env.REACT_APP_SERVER_UPLOADS_URL}/${user.avatar}`
                  : '/assets/img/default-avatar.svg'
              }
              alt={user.username}
              className="rounded-full w-full h-auto"
            />
            <div className="absolute top-5 right-5 flex gap-2">
              <button onClick={openChangeAvatarFormDrawer} className="bg-amber-400 text-black p-1 rounded">
                <FaPen />
              </button>
              {user.avatar && (
                <button onClick={handleDeleteAvatar} className="bg-red-400 text-black p-1 rounded">
                  <FaTrash />
                </button>
              )}
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-semibold text-2xl px-4 py-2">
              <FaUser /> À propos
            </div>
            <div className="text-gray-700 dark:text-white">
              <div className="grid md:grid-cols-2 text-sm">
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold flex items-center gap-2">
                    Prénom <FaPen className="cursor-pointer" onClick={openFirstNameFormDrawer} />
                  </div>
                  <div className="px-4 py-2">
                    {user.first_name ? validator.unescape(user.first_name) : 'Non renseigné'}
                  </div>
                </div>

                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold flex items-center gap-2">
                    Nom <FaPen className="cursor-pointer" onClick={openLastNameFormDrawer} />
                  </div>
                  <div className="px-4 py-2">
                    {user.last_name ? validator.unescape(user.last_name) : 'Non renseigné'}
                  </div>
                </div>

                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold flex items-center gap-2">
                    Civilité <FaPen className="cursor-pointer" onClick={openGenderFormDrawer} />
                  </div>
                  <div className="px-4 py-2">
                    {user.gender
                      ? user.gender === 'M'
                        ? 'Homme'
                        : user.gender === 'F'
                        ? 'Femme'
                        : user.gender === 'O'
                        ? 'Autre'
                        : ''
                      : 'Non renseignée'}
                  </div>
                </div>

                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold flex items-center gap-2">
                    Site internet <FaPen className="cursor-pointer" onClick={openWebUrlFormDrawer} />
                  </div>
                  <div className="px-4 py-2">
                    {user.web_url ? <Link to={user.web_url}>{validator.unescape(user.web_url)}</Link> : 'Non renseigné'}
                  </div>
                </div>

                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold flex items-center gap-2">
                    Email <FaPen className="cursor-pointer" onClick={openEmailFormDrawer} />
                  </div>
                  <div className="px-4 py-2">
                    <Link to={`mailto:${user.email}`}>{user.email}</Link>
                  </div>
                </div>

                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold flex items-center gap-2">Date d'inscription</div>
                  <div className="px-4 py-2">{moment(user.date_registration).format('L')}</div>
                </div>

                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold flex items-center gap-2">Statut</div>
                  <div className="px-4 py-2">{user.role === 'administrator' ? 'Administrateur' : 'Utilisateur'}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 font-semibold text-2xl px-4 py-2 mt-10">
              <FaFile /> Biographie <FaPen className="cursor-pointer" onClick={openBiographyFormDrawer} />
            </div>
            <div className="px-4 py-2">{user.biography ? validator.unescape(user.biography) : 'Non renseignée'}</div>

            <div className="flex items-center gap-2 font-semibold text-2xl px-4 py-2 mt-10">
              <FaFile /> Compétences <FaPen className="cursor-pointer" onClick={openSkillsFormDrawer} />
            </div>
            <div className="px-4 py-2">{user.skills ? validator.unescape(user.skills) : 'Non renseignées'}</div>
          </div>
        </div>

        <Drawer
          placement="right"
          open={openChangeAvatarForm}
          onClose={closeChangeAvatarFormDrawer}
          overlay={false}
          className="dark:bg-slate-950">
          <ChangeAvatarForm />
        </Drawer>

        <Drawer
          placement="right"
          open={openChangePasswordForm}
          onClose={closeChangePasswordFormDrawer}
          overlay={false}
          className="dark:bg-slate-950">
          <ChangePasswordForm />
        </Drawer>

        <Drawer
          placement="right"
          open={openFirstNameForm}
          onClose={closeFirstNameFormDrawer}
          overlay={false}
          className="dark:bg-slate-950">
          <ChangeUserDataForm inputType="text" label="Prénom" field="first_name" currentValue={user.first_name} />
        </Drawer>

        <Drawer
          placement="right"
          open={openLastNameForm}
          onClose={closeLastNameFormDrawer}
          overlay={false}
          className="dark:bg-slate-950">
          <ChangeUserDataForm inputType="text" label="Nom de famille" field="last_name" currentValue={user.last_name} />
        </Drawer>

        <Drawer
          placement="right"
          open={openEmailForm}
          onClose={closeEmailFormDrawer}
          overlay={false}
          className="dark:bg-slate-950">
          <ChangeUserDataForm inputType="email" label="Adresse e-mail" field="email" />
        </Drawer>

        <Drawer
          placement="right"
          open={openGenderForm}
          onClose={closeGenderFormDrawer}
          overlay={false}
          className="dark:bg-slate-950">
          <ChangeUserDataForm label="Civilité" field="gender" currentValue={user.gender} />
        </Drawer>

        <Drawer
          placement="right"
          open={openWebUrlForm}
          onClose={closeWebUrlFormDrawer}
          overlay={false}
          className="dark:bg-slate-950">
          <ChangeUserDataForm inputType="text" label="Site Internet" field="web_url" currentValue={user.web_url} />
        </Drawer>

        <Drawer
          placement="right"
          open={openBiographyForm}
          onClose={closeBiographyFormDrawer}
          overlay={false}
          className="dark:bg-slate-950">
          <ChangeUserDataForm
            inputType="text"
            label="Biographie (maximum 200 caractères)"
            field="biography"
            currentValue={user.biography}
          />
        </Drawer>

        <Drawer
          placement="right"
          open={openSkillsForm}
          onClose={closeSkillsFormDrawer}
          overlay={false}
          className="dark:bg-slate-950">
          <ChangeUserDataForm inputType="text" label="Compétences" field="skills" currentValue={user.skills} />
        </Drawer>
      </>
    );
  } else {
    return <p>Vous n'êtes pas connecté(e).</p>;
  }
};

export default ProfilePage;
