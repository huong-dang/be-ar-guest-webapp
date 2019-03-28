import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const styles = {
    faqLayout:  {
        marginBottom: 15,
    },
    questionText: {
        fontSize: 14,
        fontFamily: "Avenir",
    },
    answerText :    {
        fontSize: 12,
        fontFamily: "Avenir",
        overflowWrap: "break-word",
    },
};

function FAQDrawer(props) {
    const {classes} = props;

    return (
        <div className={classes.faqLayout}>   
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.questionText}>
                        Where can I use the be AR guest application?
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography className={classes.answerText}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.questionText}>
                        How do I download the be AR guest mobile application?
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography className={classes.answerText}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.questionText}>
                        How can I submit reviews of dishes and/or alterations?
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography className={classes.answerText}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.questionText}>
                        How do I use the augmented reality menu scanner?
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography className={classes.answerText}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.questionText}>
                        Can I only access the menu information on the mobile application?
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography className={classes.answerText}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}

FAQDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FAQDrawer);