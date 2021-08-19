import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

const theme = createTheme({
  overrides: {
    MuiContainer: {
      fill: "blue",
    }
  }
});

export default function BookStandPage(detailedBookData) {

    return(
      <ThemeProvider theme={theme} id="themeTag">
        <Container disablegutters maxWidth="lg" component="div" className="filler">
          <div>Book Page Test</div>
        </Container>
        <div className="filler">Test</div>
      </ThemeProvider>
    );

}

/*   reminder from api doc that bookdata will come as
  {
    "title": "Hunger Games",
    "authors": ["Suzanne Collins"],
    "genres": ["Young Adult", "Dystopian"],
    "datePublished": "2012-12-20",
    "description": "Katniss Everdeen fights the distopian government"
  }
*/


