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
    const { location } = this.props;

    return (
      <section className={styles.main} id="sign-in-page">
        <header className={styles.header}>
          <H1>ВХІД з E-heath</H1>
        </header>
        <article className={styles.form}>
          <SignInForm
            onSubmit={({ email, password }) => (
              this.props.onSubmit(email, password).then(() => (
                this.props.router.push(`/accept${location.search}`)
              ))
            )}
          />
        </article>
      </section>
    );
  }
}
