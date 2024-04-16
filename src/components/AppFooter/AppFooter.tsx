// App footer
// This component is used to render the app footer.
// It includes the following components:
// - AppFooterStyles
// - AppFooter

import { AppFooterStyles } from './styles';

export const AppFooter = () => {
  // Footer styles
  const { footer, container, credits } = AppFooterStyles;

  return (
    <footer css={footer}>
      <div css={container}>
        <div css={credits}>
          Secure Area | This website is protected by 256-bit SSL security.
          ©2012-2023 Credit Repair Cloud. All rights reserved. Patent Pending.
          <br />
          Credit Repair Cloud • 12517 Venice Blvd. • Los Angeles, CA 90066
        </div>
      </div>
    </footer>
  );
};
