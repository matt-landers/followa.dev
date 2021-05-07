<?php

namespace FollowADev;

use WPGraphQL\Type\WPEnumType;

class PrefersColorSchemeEnum {
    const TYPE = 'PrefersColorSchemeEnum';

    public function register_hooks() {
        add_action( 'graphql_register_types', [ $this, 'register' ] );
    }

    public function register() {
        register_graphql_enum_type(
            self::TYPE,
            [
                'description' => __( 'User theme setting.', 'followadev' ),
                'values'      => [
                    'LIGHT' => [
                        'description' => __( 'Light theme', 'followadev' ),
                        'value'       => 'LIGHT',
                    ],
                    'DARK' => [
                        'description' => __( 'Dark theme', 'followadev' ),
                        'value'       => 'DARK',
                    ],
                ],
            ]
        );
    }
}