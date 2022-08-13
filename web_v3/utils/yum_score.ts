type YumScoreProps = {
  chef_following: number;
  chef_days_active: number;
  taste_rating: number;
  overall_rating: number;
  quality_rating: number;
  rating_length: number;
  num_saves: number;
  num_views: number;
};

export const YumScore = (
  // chef_following: number,
  // chef_days_active: number,
  taste_rating: number,
  overall_rating: number,
  quality_rating: number,
  rating_length: number,
  num_saves: number,
  num_views: number
) => {
  const score =
    // 0.05 * chef_following *
    // (0.05 * chef_days_active) *
    (0.8 *
      taste_rating *
      (0.8 * overall_rating) *
      (0.3 * quality_rating) *
      (0.9 * rating_length) *
      (0.8 * num_saves + 0.3 * (num_views + 1))) /
    100000000;
  return String(Math.abs(score - 73)).slice(0, 2);
};

// comments
// pos neg review ratio
// normalize to 100
