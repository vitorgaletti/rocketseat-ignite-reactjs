import { render, screen } from '@testing-library/react';
import Post, { getServerSideProps } from '../../pages/posts/[slug]';
import { mocked } from 'jest-mock';
import { getPrismicClient } from '../../services/prismic';
import { getSession } from 'next-auth/react';

const post = {
  slug: 'my-new-post',
  title: 'My new post',
  content: '<p>Post excerpt</p>',
  updatedAt: '10 de Abril'
};
jest.mock('next-auth/react');
jest.mock('../../services/prismic');

describe('Post page', () => {
  it('renders correctly', () => {
    render(<Post post={post} />);

    expect(screen.getByText('My new post')).toBeInTheDocument();
    expect(screen.getByText('Post excerpt')).toBeInTheDocument();
  });

  it('redirects user if no subscription is found', async () => {
    const getSessionMocked = mocked(getSession);
    getSessionMocked.mockResolvedValueOnce(null);

    const response = await getServerSideProps({
      params: { slug: 'my-new-post' }
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: '/'
        })
      })
    );
  });

  it('loads initial data', async () => {
    const getSessionMocked = mocked(getSession);

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

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: 'fake-active-subscription'
    } as any);

    const response = await getServerSideProps({
      params: { slug: 'my-new-post' }
    } as any);

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
