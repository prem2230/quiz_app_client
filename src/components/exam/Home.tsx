import { Container, Typography, Button, Box, Grid, Tooltip, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useQuiz } from '../quiz/hooks';
import { getDifficultyStyle, standardCase } from '../../utils';
import { useStyles } from './exam.styles';
import Pagination from '../common/Pagination';
import NoData from '../common/NoData';
import QuestionCardLoader from '../loaders/QuestionCardLoader';

const Home = () => {
  const styles = useStyles();
  const navigate = useNavigate();
  const { loadAllQuizzes, quizzes, loading } = useQuiz();

  useEffect(() => {
    loadAllQuizzes();
  }, [])

  if (!quizzes.length && !loading) {
    return <NoData title="No Quizzes Found" message='There is no quizzes currently available. Please check back later.' isExam={true} />
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom textAlign="center">
        Welcome to Tech Quiz
      </Typography>
      {loading ? <QuestionCardLoader value={8} />
        :
        <Grid container spacing={2} alignItems="stretch">
          {quizzes?.map((quiz) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={quiz._id} sx={styles.quizCardGrid}>
              <Box sx={styles.cardBox}>
                <Box>
                  <Tooltip title={quiz.title} >
                    <Typography sx={styles.quizTitle}>
                      {standardCase(quiz.title)}
                    </Typography>
                  </Tooltip>
                </Box>
                <Divider />
                <Box sx={styles.descriptionBox}>
                  <Typography sx={styles.quizDescription} noWrap>
                    {standardCase(quiz.description)}
                  </Typography>
                </Box>
                <Box sx={styles.detailsBox}>
                  <Typography sx={styles.typography}>
                    {quiz.questions.length} Questions
                  </Typography>
                  <Typography sx={styles.typography}>
                    {quiz.totalMarks} Marks
                  </Typography>
                  <Typography sx={styles.typography}>
                    {quiz.duration} minutes
                  </Typography>
                </Box>
                <Box sx={styles.badgeBox}>
                  <Typography sx={{ ...styles.difficultyBadge, backgroundColor: getDifficultyStyle(quiz.difficulty, styles) }}>
                    {standardCase(quiz.difficulty)}
                  </Typography>
                </Box>
                <Box sx={styles.btnBox}>
                  <Button fullWidth variant='contained' sx={styles.startBtn}
                    onClick={() => navigate(`/quiz/${quiz._id}`)}
                  >Start Quiz</Button>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      }
      <Pagination module="quiz" />

    </Container>
  );
};

export default Home;
