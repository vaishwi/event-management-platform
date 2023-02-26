
import React from 'react';
import { makeStyles } from '@mui/styles';
import {
    Avatar,
    Breadcrumbs,
    Button,
    Container,
    Grid,
    Link,
    Paper,
    Typography,
    createTheme
} from '@mui/material';
import { LocationOn, Message, PersonAdd } from '@mui/icons-material';
const theme = createTheme();

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    breadcrumbs: {
        margin: `${theme.spacing(2)} 0`,
    },
    avatar: {
        width: theme.spacing(20),
        height: theme.spacing(20),
    },
    socialLinks: {
        display: 'flex',
        justifyContent: 'center',
        margin: `${theme.spacing(3)} 0`,
    },
    socialLink: {
        margin: `0 ${theme.spacing(2)}`,
    },
    contactInfo: {
        padding: theme.spacing(3),
    },
    contactInfoItem: {
        display: 'flex',
        alignItems: 'center',
        margin: `${theme.spacing(2)} 0`,
    },
    contactInfoIcon: {
        marginRight: theme.spacing(1),
    },
    projectStatus: {
        margin: `${theme.spacing(3)} 0`,
        padding: theme.spacing(3),
    },
}));

const Profile = () => {
    const classes = useStyles();

    return (
        <Container className={classes.root}>
            <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
                <Link color="inherit" href="/">
                    Home
                </Link>
                <Typography color="textPrimary">Profile</Typography>
            </Breadcrumbs>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3}>
                        <Avatar
                            alt="Profile Picture"
                            src="https://picsum.photos/200"
                            className={classes.avatar}
                        />
                        <Typography variant="h5" align="center">
                            John Smith
                        </Typography>
                        <Typography variant="subtitle1" align="center">
                            Web Developer
                        </Typography>
                        <Typography variant="subtitle2" align="center">
                            <LocationOn fontSize="small" className={classes.contactInfoIcon} />
                            New York, NY
                        </Typography>
                        <div className={classes.socialLinks}>
                            <Link href="#" className={classes.socialLink}>
                                <i className="fab fa-facebook fa-lg"></i>
                            </Link>
                            <Link href="#" className={classes.socialLink}>
                                <i className="fab fa-twitter fa-lg"></i>
                            </Link>
                            <Link href="#" className={classes.socialLink}>
                                <i className="fab fa-linkedin fa-lg"></i>
                            </Link>
                            <Link href="#" className={classes.socialLink}>
                                <i className="fab fa-github fa-lg"></i>
                            </Link>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button variant="contained" color="primary" startIcon={<PersonAdd />}>
                                Follow
                            </Button>
                            <Button variant="contained" color="secondary" startIcon={<Message />}>
                                Message
                            </Button>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Paper elevation={3} className={classes.contactInfo}>
                        <Typography variant="h5" align="center">
                            Contact Information
                        </Typography>
                        <div className={classes.contactInfoItem}>
                            <Typography variant="subtitle1" className={classes.contactInfoIcon}>
                                <i className="fas fa-user fa-lg"></i>
                            </Typography>
                            <Typography variant="subtitle1">John Smith</Typography>
                        </div>
                        <div className={classes.contactInfoItem}>
                            <Typography variant="subtitle1" className={classes.contactInfoIcon}>
                                <i className="fas fa-envelope fa-lg"></i>
                            </Typography>
                            <Typography variant="subtitle1">johnsmith@example.com</Typography>
                        </div>
                        <div className={classes.contactInfoItem}>
                            <Typography variant="subtitle1" className={classes.contactInfoIcon}>
                                <i className="fas fa-phone fa-lg"></i>
                            </Typography>
                            <Typography variant="subtitle1">(123) 456-7890</Typography>
                        </div>
                        <div className={classes.contactInfoItem}>
                            <Typography variant="subtitle1" className={classes.contactInfoIcon}>
                                <i className="fas fa-mobile-alt fa-lg"></i>
                            </Typography>
                            <Typography variant="subtitle1">(123) 456-7890</Typography>
                        </div>
                        <div className={classes.contactInfoItem}>
                            <Typography variant="subtitle1" className={classes.contactInfoIcon}>
                                <i className="fas fa-map-marker-alt fa-lg"></i>
                            </Typography>
                            <Typography variant="subtitle1">123 Main St, New York, NY 10001</Typography>
                        </div>
                    
                </Paper>
                <Paper elevation={3} className={classes.projectStatus}>
                    <Typography variant="h5" align="center">
                        Project Status
                    </Typography>
                    <Typography variant="subtitle1" align="center">
                        Web Design Project: In Progress
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
</Container >
);
};

export default Profile;

