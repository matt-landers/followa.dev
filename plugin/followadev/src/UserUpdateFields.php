<?php

namespace FollowADev;

use GraphQL\Error\UserError;
use GraphQL\Type\Definition\ResolveInfo;
use WPGraphQL\AppContext;

class UserUpdateFields {

    public function register_hooks() {
        add_action( 'graphql_register_types',                              [ $this, 'register_input_fields'] );
        add_action( 'graphql_user_object_mutation_update_additional_data', [ $this, 'save_additional_data' ], 10, 3 );
    }

    public function register_input_fields() {
        register_graphql_fields( 'UpdateUserInput', [
            'prefersColorScheme' => [
                'type'        => [ 'non_null' => PrefersColorSchemeEnum::TYPE ],
                'description' => __( 'User\'s preferred color theme', 'followadev' ),
            ],
        ] );
    }

    /**
     * @param int    $user_id       The ID of the user being mutated.
     * @param array  $input         The input for the mutation.
     * @param string $mutation_name The name of the mutation (ex: create, update, delete).
     */
    public function save_additional_data( int $user_id, array $input, string $mutation_name ) : void {
        
        if ( ! $this->is_update_user_mutation( $mutation_name ) ) {
            return;
        }

        $prefers_color_scheme_sanitized = sanitize_text_field( $input['prefersColorScheme'] );

        update_user_meta( $user_id, 'prefers_color_scheme', $prefers_color_scheme_sanitized );

    }

    private function is_update_user_mutation( string $mutation_name ) : bool {
        return 'updateUser' === $mutation_name;
    }
}