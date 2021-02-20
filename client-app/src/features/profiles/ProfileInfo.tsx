import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Tab } from 'semantic-ui-react';
import { Profile } from '../../app/models/profile';

interface Props {
    profile: Profile,
    editable: boolean,
    editMode: boolean,
    setEditMode(arg: boolean): any
}

export default observer(function ProfileInfo({profile, editable, editMode, setEditMode} : Props) {
    
    return (
        <Tab.Pane style={{whiteSpace: 'pre-wrap'}}>
                {profile.bio}
                <br /><br /><br />
                {editable && 
                    <Button content='Edit profile' onClick={() => setEditMode(!editMode)} /> 
                }
                
            </Tab.Pane>
    )
})