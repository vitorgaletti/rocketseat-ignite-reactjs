import { render, screen } from '@testing-library/react';
import Post, { getStaticProps } from '../../pages/posts/preview/[slug]';
import { mocked } from 'jest-mock';
import { getPrismicClient } from '../../services/prismic';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const post = {
  slug: 'my-new-post',
  title: 'My new post',
  content: '<p>Post excerpt</p>',
  updatedAt: '10 de Abril'
};
jest.mock('next-auth/react');
jest.mock('next/router');
jest.mock('../../services/prismic');

describe('Post preview page', () => {
  it('renders correctly', () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({ data: null, status: 'loading' });

    render(<Post post={post} />);

    expect(screen.getByText('My new post')).toBeInTheDocument();
    expect(screen.getByText('Post excerpt')).toBeInTheDocument();
    expect(screen.getByText('Wanna continue reading?')).toBeInTheDocument();
  });

  it('redirects user to full post when user is subscribed', async () => {
    const useSessionMocked = mocked(useSession);
    const useRouterMocked = mocked(useRouter);
    const pushMock = jest.fn();

    useSessionMocked.mockReturnValueOnce({
      data: {
        activeSubscription: 'fake-subscription'
      },
      status: 'loading'
    } as any);

    useRouterMocked.mockReturnValueOnce({
      push: pushMock
    } as any);

    render(<Post post={post} />);

    expect(pushMock).toHaveBeenCalledWith('/posts/my-new-post');
  });

  it('loads initial data', async () => {
    const getPrimiscClientMocked = mocked(getPrismicClient);

    getPrimiscClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [{ type: 'heading', text: 'My new post' }],
          content: [
            {
              type: 'paragraph',
              text: 'Post content'
            }
          ]
        },
        last_publication_date: '04-01-2021'
      })
    } as any);

    const response = await getStaticProps({ params: { slug: 'my-new-post' } });

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'my-new-post',
            title: 'My new post',
            content: 'Post content',
            updatedAt: '01 de abril de 2021'
          }
        }
      })
    );
  });
});
