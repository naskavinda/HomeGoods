import { useState, useEffect } from 'react';
import { 
  Box,
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { fetchProducts } from '../../utils/api';
import { Product } from '../../types/product';

function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to load products');
        console.error('Error loading products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      bgcolor: 'background.default', 
      minHeight: '100vh',
      py: { xs: 2, sm: 3, md: 4 }
    }}>
      <Container maxWidth="lg">
        <Typography 
          variant={isMobile ? "h5" : "h4"} 
          component="h1" 
          gutterBottom
          sx={{ 
            mb: { xs: 2, sm: 3, md: 4 },
            textAlign: { xs: 'center', sm: 'left' }
          }}
        >
          Products
        </Typography>
        
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {products?.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card 
                elevation={2}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent sx={{ 
                  flexGrow: 1,
                  p: { xs: 2, sm: 3 },
                  '&:last-child': { pb: { xs: 2, sm: 3 } }
                }}>
                  <Typography 
                    variant="h6" 
                    component="h2"
                    sx={{
                      fontSize: { xs: '1.1rem', sm: '1.25rem' },
                      textAlign: { xs: 'center', sm: 'left' }
                    }}
                  >
                    {product.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductListPage;
