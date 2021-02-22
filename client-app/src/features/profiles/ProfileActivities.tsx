import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import {  Card, Grid, GridColumn, Header, Tab } from 'semantic-ui-react';
import { Profile} from '../../app/models/profile';
import { useStore } from '../../app/stores/store';
import ProfileActivityCard from './ProfileActivityCard';
import '../../app/layout/styleProfile.css';

interface Props {
    profile: Profile
}


export default observer(function ProfileActivities({profile} : Props) {

    const {profileStore: {userActivities, loadUserActivities, loadingActivities}} = useStore();
    useEffect(() => {
        
    }, [userActivities]);

    function handleLoadActivities(predicate: string) {
        //loadUserActivities(profile.username, predicate)
    }


    
    const panes = [
        { menuItem: 'Future Events', render: () => <Tab.Pane attached={false} loading={loadingActivities} onClick={handleLoadActivities("future")}>{showContent()}</Tab.Pane>},
        { menuItem: 'Past Events', render: () => <Tab.Pane attached={false} loading={loadingActivities} onClick={handleLoadActivities("past")}>{showContent()}</Tab.Pane> },
        { menuItem: 'Hosting', render: () => <Tab.Pane attached={false} loading={loadingActivities} onClick={handleLoadActivities("isHost")}>{showContent()}</Tab.Pane> },
      ]
    
    function changeContent(activeIndex: any) {
        var predicate = "future";
        switch(activeIndex) {
            case 1:
                predicate = "past";
                break;
            case 2:
                predicate = "isHost";
                break;
            default:
                predicate = "future";
                break;
        }
        loadUserActivities(profile.username, predicate);
    } 
    function showContent() {
        return (
            <>
                <Card.Group centered itemsPerRow={4}>
                {userActivities.map(activity => (
                    <ProfileActivityCard key={activity.id} activity={activity} />
                ))}
                </Card.Group>
            </> 
        )
    }

    return (
        
        <Tab.Pane>
            <Grid>
                <GridColumn width={16}>
                    <Header
                        floated='left'
                        icon='user'
                        content={`Activities`}
                    />
                </GridColumn>
                <GridColumn width={16}>
                    <Tab menu={{ secondary: true, pointing: true }}  panes={panes} onTabChange={(e, data) => changeContent(data.activeIndex)} />
                </GridColumn>
        </Grid>
        </Tab.Pane>
    )
    
})