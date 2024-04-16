import { Typography } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import ReactPlayer from 'react-player';
import { Banner } from './Banner';

export default {
    title: 'Banner',
    component: Banner
} as ComponentMeta<typeof Banner>;

const Template: ComponentStory<typeof Banner> = (args) => (
    <Banner {...args} />
);

export const Primary = Template.bind({});
const VideoContent = () => (
    <React.Fragment>
        <h2></h2>
        <ReactPlayer url="https://player.vimeo.com/video/560100304?badge=0&player_id=0?autoplay=0&amp;modestbranding=1&amp;showinfo=0" width="100%" controls />
    </React.Fragment>
);
const Children = () => {
    return (
        <Typography
            variant="h4"
            gutterBottom
            className="font-26-400"
            style={{ marginBottom: '8px' }}
        >
            Welcome To Credit Repair Cloud!
        </Typography>
    )
}
Primary.args = {
    videoLength: '15.30',
    overLayImage: 'https://qa.creditrepaircloud.com/assets/images/banners/Home.png',
    children: <Children />,
    videoTitle: 'Welcome To Credit Repair Cloud!',
    videoContent: <VideoContent />,

};
