import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'withStyles';
import { withRouter } from 'react-router';

import { H1 } from 'components/Title';

import SignInForm from 'containers/forms/SignInForm';

import { onSubmit } from './redux';

import styles from './styles.scss';

@withRouter
@withStyles(styles)
@connect(null, { onSubmit })
export default class SignInPage extends React.Component {
  render() {
    const { onSubmit, location } = this.props;

    return (
      <section className={styles.main} id="sign-in-page">
        <header className={styles.header}>
          <H1>Вхід у систему eHealth</H1>
        </header>
        <article className={styles.form}>
          <SignInForm
            onSubmit={onSubmit}
            initialValues={{
              email: location.query.email,
            }}
          />
        </article>
      </section>
    );
  }
}
