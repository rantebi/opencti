import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import graphql from 'babel-plugin-relay/macro';
import { withStyles } from '@material-ui/core/styles';
import { Form, Formik, Field } from 'formik';
import { compose, pick } from 'ramda';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import * as Yup from 'yup';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import { ListItemAvatar } from '@material-ui/core';
import { SubscriptionFocus } from '../../../components/Subscription';
import { commitMutation, QueryRenderer } from '../../../relay/environment';
import inject18n from '../../../components/i18n';
import TextField from '../../../components/TextField';
import SelectField from '../../../components/SelectField';
import Loader from '../../../components/Loader';
import MarkDownField from '../../../components/MarkDownField';

const styles = () => ({
  container: {
    margin: 0,
  },
  paper: {
    width: '100%',
    height: '100%',
    padding: '20px 20px 30px 20px',
    textAlign: 'left',
    borderRadius: 6,
  },
  button: {
    float: 'right',
    margin: '20px 0 0 0',
  },
});

const settingsQuery = graphql`
  query SettingsQuery {
    settings {
      id
      platform_title
      platform_email
      platform_url
      platform_theme
      platform_language
      platform_login_message
      platform_providers {
        name
        strategy
      }
      editContext {
        name
        focusOn
      }
    }
  }
`;

const settingsMutationFieldPatch = graphql`
  mutation SettingsFieldPatchMutation($id: ID!, $input: EditInput!) {
    settingsEdit(id: $id) {
      fieldPatch(input: $input) {
        id
        platform_title
        platform_email
        platform_url
        platform_theme
        platform_language
        platform_login_message
      }
    }
  }
`;

const settingsFocus = graphql`
  mutation SettingsFocusMutation($id: ID!, $input: EditContext!) {
    settingsEdit(id: $id) {
      contextPatch(input: $input) {
        id
      }
    }
  }
`;

const settingsAboutQuery = graphql`
  query SettingsAboutQuery {
    about {
      version
      dependencies {
        name
        version
      }
    }
  }
`;

const settingsValidation = (t) => Yup.object().shape({
  platform_title: Yup.string().required(t('This field is required')),
  platform_email: Yup.string()
    .required(t('This field is required'))
    .email(t('The value must be an email address')),
  platform_url: Yup.string()
    .required(t('This field is required'))
    .url(t('The value must be an URL')),
  platform_theme: Yup.string(),
  platform_language: Yup.string(),
  platform_login_message: Yup.string(),
});

class Settings extends Component {
  // eslint-disable-next-line class-methods-use-this
  handleChangeFocus(id, name) {
    commitMutation({
      mutation: settingsFocus,
      variables: {
        id,
        input: {
          focusOn: name,
        },
      },
    });
  }

  handleSubmitField(id, name, value) {
    settingsValidation(this.props.t)
      .validateAt(name, { [name]: value })
      .then(() => {
        commitMutation({
          mutation: settingsMutationFieldPatch,
          variables: { id, input: { key: name, value } },
        });
      })
      .catch(() => false);
  }

  render() {
    const { t, classes } = this.props;
    return (
      <div className={classes.container}>
        <QueryRenderer
          query={settingsQuery}
          render={({ props }) => {
            if (props && props.settings) {
              const { settings } = props;
              const { id, editContext } = settings;
              const initialValues = pick(
                [
                  'platform_title',
                  'platform_email',
                  'platform_url',
                  'platform_theme',
                  'platform_language',
                  'platform_login_message',
                ],
                settings,
              );
              const authProviders = settings.platform_providers;
              let i = 0;
              return (
                <div>
                  <Grid container={true} spacing={3}>
                    <Grid item={true} xs={6}>
                      <Paper classes={{ root: classes.paper }} elevation={2}>
                        <Formik
                          enableReinitialize={true}
                          initialValues={initialValues}
                          validationSchema={settingsValidation(t)}
                        >
                          {() => (
                            <div>
                              <Typography variant="h1" gutterBottom={true}>
                                {t('Configuration')}
                              </Typography>
                              <Form style={{ marginTop: 20 }}>
                                <Field
                                  component={TextField}
                                  name="platform_title"
                                  label={t('Name')}
                                  fullWidth={true}
                                  onFocus={this.handleChangeFocus.bind(
                                    this,
                                    id,
                                  )}
                                  onSubmit={this.handleSubmitField.bind(
                                    this,
                                    id,
                                  )}
                                  helperText={
                                    <SubscriptionFocus
                                      context={editContext}
                                      fieldName="platform_title"
                                    />
                                  }
                                />
                                <Field
                                  component={TextField}
                                  name="platform_email"
                                  label={t('Sender email address')}
                                  fullWidth={true}
                                  style={{ marginTop: 20 }}
                                  onFocus={this.handleChangeFocus.bind(
                                    this,
                                    id,
                                  )}
                                  onSubmit={this.handleSubmitField.bind(
                                    this,
                                    id,
                                  )}
                                  helperText={
                                    <SubscriptionFocus
                                      context={editContext}
                                      fieldName="platform_email"
                                    />
                                  }
                                />
                                <Field
                                  component={TextField}
                                  name="platform_url"
                                  label={t('Base URL')}
                                  fullWidth={true}
                                  style={{ marginTop: 20 }}
                                  onFocus={this.handleChangeFocus.bind(
                                    this,
                                    id,
                                  )}
                                  onSubmit={this.handleSubmitField.bind(
                                    this,
                                    id,
                                  )}
                                  helperText={
                                    <SubscriptionFocus
                                      context={editContext}
                                      fieldName="platform_email"
                                    />
                                  }
                                />
                                <Field
                                  component={SelectField}
                                  name="platform_theme"
                                  label={t('Theme')}
                                  fullWidth={true}
                                  containerstyle={{
                                    marginTop: 20,
                                    width: '100%',
                                  }}
                                  onFocus={this.handleChangeFocus.bind(
                                    this,
                                    id,
                                  )}
                                  onChange={this.handleSubmitField.bind(
                                    this,
                                    id,
                                  )}
                                  helpertext={
                                    <SubscriptionFocus
                                      context={editContext}
                                      fieldName="platform_theme"
                                    />
                                  }
                                >
                                  <MenuItem value="dark">{t('Dark')}</MenuItem>
                                  <MenuItem value="light">
                                    {t('Light')}
                                  </MenuItem>
                                </Field>
                                <Field
                                  component={SelectField}
                                  name="platform_language"
                                  label={t('Language')}
                                  fullWidth={true}
                                  containerstyle={{
                                    marginTop: 20,
                                    width: '100%',
                                  }}
                                  onFocus={this.handleChangeFocus.bind(
                                    this,
                                    id,
                                  )}
                                  onChange={this.handleSubmitField.bind(
                                    this,
                                    id,
                                  )}
                                  helpertext={
                                    <SubscriptionFocus
                                      context={editContext}
                                      fieldName="platform_language"
                                    />
                                  }
                                >
                                  <MenuItem value="auto">
                                    <em>{t('Automatic')}</em>
                                  </MenuItem>
                                  <MenuItem value="en">English</MenuItem>
                                  <MenuItem value="fr">Français</MenuItem>
                                </Field>
                              </Form>
                            </div>
                          )}
                        </Formik>
                      </Paper>
                    </Grid>
                    <Grid item={true} xs={6}>
                      <Paper classes={{ root: classes.paper }} elevation={2}>
                        <Typography variant="h1" gutterBottom={true}>
                          {t('Authentication strategies')}
                        </Typography>
                        <List>
                          {authProviders.map((provider) => {
                            i += 1;
                            return (
                              <ListItem key={provider.strategy} divider={true}>
                                <ListItemAvatar>
                                  <Avatar>{i}</Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                  primary={provider.name}
                                  secondary={provider.strategy}
                                />
                              </ListItem>
                            );
                          })}
                        </List>
                        <Formik
                          enableReinitialize={true}
                          initialValues={initialValues}
                          validationSchema={settingsValidation(t)}
                        >
                          {() => (
                            <Form style={{ marginTop: 20 }}>
                              <Field
                                component={MarkDownField}
                                name="platform_login_message"
                                label={t('Platform login message')}
                                fullWidth={true}
                                multiline={true}
                                rows="4"
                                style={{ marginTop: 20 }}
                                onFocus={this.handleChangeFocus.bind(this, id)}
                                onSubmit={this.handleSubmitField.bind(this, id)}
                                helperText={
                                  <SubscriptionFocus
                                    context={editContext}
                                    fieldName="platform_login_message"
                                  />
                                }
                              />
                            </Form>
                          )}
                        </Formik>
                      </Paper>
                    </Grid>
                  </Grid>
                  <Grid container={true} spacing={3} style={{ marginTop: 20 }}>
                    <Grid item={true} xs={12}>
                      <Paper classes={{ root: classes.paper }} elevation={2}>
                        <QueryRenderer
                          query={settingsAboutQuery}
                          render={({ props: aboutProps }) => {
                            if (aboutProps) {
                              const { version, dependencies } = aboutProps.about;
                              return (
                                <div>
                                  <Typography variant="h1" gutterBottom={true}>
                                    {t('Tools versions')}
                                  </Typography>
                                  <List>
                                    <ListItem divider={true}>
                                      <ListItemText primary={'OpenCTI'} />
                                      <Chip label={version} />
                                    </ListItem>
                                    {dependencies.map((dep) => (
                                      <ListItem key={dep.name} divider={true}>
                                        <ListItemText primary={t(dep.name)} />
                                        <Chip label={dep.version} />
                                      </ListItem>
                                    ))}
                                  </List>
                                </div>
                              );
                            }
                            return <Loader variant="inElement" />;
                          }}
                        />
                      </Paper>
                    </Grid>
                  </Grid>
                </div>
              );
            }
            return <Loader />;
          }}
        />
      </div>
    );
  }
}

Settings.propTypes = {
  classes: PropTypes.object,
  t: PropTypes.func,
  fsd: PropTypes.func,
};

export default compose(inject18n, withStyles(styles))(Settings);
