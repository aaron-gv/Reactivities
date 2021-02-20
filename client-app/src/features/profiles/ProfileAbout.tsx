import { observer } from 'mobx-react-lite';
import React, { Fragment, useState } from 'react';
import { Tab } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { Profile } from '../../app/models/profile';
import { useStore } from '../../app/stores/store';
import ProfileEditForm from './ProfileEditForm';
import ProfileInfo from './ProfileInfo';

interface Props {
    profile: Profile,
    username: string
}

export default observer(function ProfileAbout({profile, username} : Props) {
    const [editMode, setEditmode] = useState(false);
    const {profileStore: {isCurrentUser,  loading}} = useStore();
    if (loading) return <Fragment><Tab.Pane><LoadingComponent content='Loading profile...' /></Tab.Pane></Fragment>;
    return (
        <Fragment>
            {editMode &&
                <ProfileEditForm profile={profile} username={username} editMode={editMode} setEditMode={setEditmode} isCurrentUser={isCurrentUser} loading={loading} />
            }
            {!editMode &&
                <ProfileInfo profile={profile} editable={isCurrentUser} editMode={editMode} setEditMode={setEditmode} />
             }
        </Fragment>
    )
})