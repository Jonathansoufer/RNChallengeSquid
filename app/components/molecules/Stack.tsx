import React, { ReactNode, useMemo } from 'react';
import { View, ViewProps } from 'react-native';

import styled from 'styled-components/native';
import {
  border,
  BorderProps,
  compose,
  layout,
  LayoutProps,
  space,
  SpaceProps,
} from 'styled-system';

import { Spacing } from '@/utils/constants/spacing';

interface SpacerProps {
  space?: number;
}

export const Spacer = styled.View<SpacerProps>`
  height: ${({ space }) => `${space}px`};
  width: ${({ space }) => `${space}px`};
`;

Spacer.defaultProps = {
  space: Spacing.md,
};

interface SpacedWrapperProps extends SpaceProps, LayoutProps, BorderProps {
  grow?: boolean;
  shrink?: boolean;
  basis?: number | 'auto';
  row?: boolean;
  reversed?: boolean;
  distribute?:
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'flex-end'
    | 'flex-start'
    | 'center';
  align?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  wrap?: boolean;
  bgColor?: string;
}

const SpacedWrapper = styled(View)<SpacedWrapperProps>`
  ${compose(space, layout, border)};
  flex-grow: ${({ grow }) => (grow ? '1' : '0')};
  flex-shrink: ${({ shrink }) => (shrink ? '1' : '0')};
  flex-basis: ${({ basis }) => basis};
  flex-direction: ${({ row, reversed }) =>
    `${row ? 'row' : 'column'}${reversed ? '-reverse' : ''}`};
  justify-content: ${({ distribute }) => distribute};
  align-items: ${({ align }) => align};
  flex-wrap: ${({ wrap }) => (wrap ? 'wrap' : 'nowrap')};
  background-color: ${({ bgColor }) => bgColor};
`;
SpacedWrapper.displayName = 'SpacedWrapper';
SpacedWrapper.defaultProps = {
  basis: 'auto',
  row: false,
  reversed: false,
  distribute: 'flex-start',
  align: 'stretch',
  wrap: false,
};

interface StackItemsProps {
  children?: any;
  space?: number;
  separator?: any;
}

const mapStackChildren = ({ children, space, separator }: StackItemsProps) => {
  let hasRendered = false;
  return React.Children.map(children ?? [], child => {
    if (!child) {
      return null;
    }

    const isFirst = hasRendered === false;
    hasRendered = true;

    return (
      <>
        {isFirst ? null : separator || <Spacer space={space} />}
        {child}
      </>
    );
  });
};

const StackItems = ({ children, space, separator }: StackItemsProps) => {
  return useMemo(
    () => mapStackChildren({ children, space, separator }),
    [children, space, separator],
  );
};

const UnmemoizedStackItems = (props: StackItemsProps) => {
  return mapStackChildren(props);
};

interface StackProps extends SpacedWrapperProps, ViewProps {
  children?: ReactNode;
  space?: number;
  separator?: ReactNode;
}

const StackImpl = ({
  children,
  space,
  separator,
  ...wrapperProps
}: StackProps) => {
  return (
    <SpacedWrapper {...wrapperProps}>
      <StackItems children={children} space={space} separator={separator} />
    </SpacedWrapper>
  );
};

/**
 * @param {ReactNode} children - React nodes to be rendered inside the StackItems
 * @param {number} space - Space between stack items; defaults to 16 / Spacing.md
 * @param {ReactNode} separator - Separator to be rendered between stack items
 * @param {styled_space} space - Set space props https://styled-system.com/table/#space
 * @param {styled_layout} layout - Set space props https://styled-system.com/table/#layout
 * @param {styled_border} border - Set space props https://styled-system.com/table/#border
 * @param {string} bgColor - background-color prop;
 * @param {string} distribute - justify-content prop; default to 'flex-start'
 * @param {string} align - align-items prop; defaults to 'stretch'
 * @param {boolean} row - flex-direction row boolean prop
 * @param {boolean} reversed - flex-direction reversed boolean prop
 * @param {boolean} grow - flex-grow prop
 * @param {boolean} shrink - flex-shrink prop
 * @param {boolean} basis - flex-basis prop; defaults to 'auto'
 * @param {boolean} wrap - flex-wrap prop
 * @returns memoized StackImpl
 */
export const Stack = React.memo(StackImpl);
Stack.displayName = 'Stack';

export const UnmemoizedStackImpl = ({
  children,
  space,
  separator,
  ...wrapperProps
}: StackProps) => {
  return (
    <SpacedWrapper {...wrapperProps}>
      <UnmemoizedStackItems
        children={children}
        space={space}
        separator={separator}
      />
    </SpacedWrapper>
  );
};
