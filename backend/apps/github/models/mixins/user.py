"""GitHub user mixins."""


class UserIndexMixin:
    """User index mixin for Algolia search."""

    @property
    def idx_login(self):
        """Return login for indexing."""
        return self.login

    @property
    def idx_name(self):
        """Return name for indexing."""
        return self.name or ""

    @property
    def idx_bio(self):
        """Return bio for indexing."""
        return self.bio or ""

    @property
    def idx_avatar_url(self):
        """Return avatar URL for indexing."""
        return self.avatar_url

    @property
    def idx_company(self):
        """Return company for indexing."""
        return self.company or ""

    @property
    def idx_location(self):
        """Return location for indexing."""
        return self.location or ""

    @property
    def idx_email(self):
        """Return email for indexing."""
        return self.email or ""

    @property
    def idx_public_repositories_count(self):
        """Return public repositories count for indexing."""
        return self.public_repositories_count

    @property
    def idx_followers_count(self):
        """Return followers count for indexing."""
        return self.followers_count

    @property
    def idx_following_count(self):
        """Return following count for indexing."""
        return self.following_count

    @property
    def idx_created_at(self):
        """Return created at timestamp for indexing."""
        return self.created_at

    @property
    def idx_updated_at(self):
        """Return updated at timestamp for indexing."""
        return self.updated_at

    @property
    def idx_type(self):
        """Return user type for indexing."""
        return self.type

    @property
    def idx_url(self):
        """Return GitHub profile URL for indexing."""
        return self.url

    @property
    def idx_title(self):
        """Return title for indexing."""
        return self.title
